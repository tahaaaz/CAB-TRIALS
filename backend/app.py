from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
from bson import ObjectId
import json

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client.coride_db

# Collections
rides_collection = db.rides
groups_collection = db.groups

class RideService:
    @staticmethod
    def find_immediate_match(direction, time_slot, vehicle_type, action_type):
        """Find immediate match (offer matches request and vice versa)"""
        opposite_action = 'offer' if action_type == 'request' else 'request'
        
        match = rides_collection.find_one({
            'direction': direction,
            'time_slot': time_slot,
            'vehicle_type': vehicle_type,
            'action_type': opposite_action,
            'status': 'pending'
        })
        
        return match
    
    @staticmethod
    def check_group_formation(direction, time_slot, vehicle_type, action_type):
        """Check if we can form a group"""
        if action_type != 'request':
            return None
        
        max_members = 4 if vehicle_type == 'cab' else 3
        
        # Get all pending requests for this slot
        pending_requests = list(rides_collection.find({
            'direction': direction,
            'time_slot': time_slot,
            'vehicle_type': vehicle_type,
            'action_type': 'request',
            'status': 'pending'
        }))
        
        if len(pending_requests) < max_members:
            return None
        
        # We have enough people to form a group
        group_members = pending_requests[:max_members]
        
        # Create a new group
        group_data = {
            'direction': direction,
            'time_slot': time_slot,
            'vehicle_type': vehicle_type,
            'status': 'complete',
            'member_count': max_members,
            'max_members': max_members,
            'created_at': datetime.utcnow()
        }
        
        group_result = groups_collection.insert_one(group_data)
        group_id = group_result.inserted_id
        
        # Update all group members
        member_ids = [member['_id'] for member in group_members]
        rides_collection.update_many(
            {'_id': {'$in': member_ids}},
            {
                '$set': {
                    'status': 'grouped',
                    'group_id': group_id,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        return {
            'type': 'group_formed',
            'message': 'Congratulations! A group has been formed for your time slot:',
            'members': [{'name': member['name'], 'contact': member['contact']} for member in group_members]
        }

@app.route('/api/submit-ride', methods=['POST'])
def submit_ride():
    try:
        data = request.json
        direction = data['direction']
        time_slot = data['timeSlot']
        vehicle_type = data['vehicleType']
        action_type = data['actionType']
        name = data['name']
        contact = data['contact']
        
        # Check for immediate match
        match = RideService.find_immediate_match(direction, time_slot, vehicle_type, action_type)
        
        if match:
            # Update the matched ride status
            rides_collection.update_one(
                {'_id': match['_id']},
                {'$set': {'status': 'matched', 'updated_at': datetime.utcnow()}}
            )
            
            # Insert the new ride with matched status
            new_ride = {
                'direction': direction,
                'time_slot': time_slot,
                'vehicle_type': vehicle_type,
                'action_type': action_type,
                'name': name,
                'contact': contact,
                'status': 'matched',
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            rides_collection.insert_one(new_ride)
            
            return jsonify({
                'type': 'immediate_match',
                'message': f"Great news! You've been matched with {match['name']}",
                'details': f"Contact: {match['contact']}. You can contact them directly to coordinate your ride.",
                'matchedWith': {
                    'name': match['name'],
                    'contact': match['contact']
                }
            })
        
        # No immediate match, insert the ride request
        new_ride = {
            'direction': direction,
            'time_slot': time_slot,
            'vehicle_type': vehicle_type,
            'action_type': action_type,
            'name': name,
            'contact': contact,
            'status': 'pending',
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        rides_collection.insert_one(new_ride)
        
        # Check if we can form a group
        group_result = RideService.check_group_formation(direction, time_slot, vehicle_type, action_type)
        
        if group_result:
            return jsonify(group_result)
        
        return jsonify({
            'type': 'waiting',
            'message': f'Thank you, {name}. Your request has been saved.',
            'details': 'We will notify you once your group is formed or a match is found.'
        })
        
    except Exception as e:
        print(f"Error submitting ride: {e}")
        return jsonify({
            'type': 'error',
            'message': 'Sorry, there was an error processing your request.',
            'details': 'Please try again later.'
        }), 500

@app.route('/api/rides/<direction>/<time_slot>/<vehicle_type>', methods=['GET'])
def get_rides_for_slot(direction, time_slot, vehicle_type):
    """Get all rides for a specific time slot and direction (for debugging)"""
    try:
        rides = list(rides_collection.find({
            'direction': direction,
            'time_slot': time_slot,
            'vehicle_type': vehicle_type
        }).sort('created_at', 1))
        
        # Convert ObjectId to string for JSON serialization
        for ride in rides:
            ride['_id'] = str(ride['_id'])
            if 'group_id' in ride and ride['group_id']:
                ride['group_id'] = str(ride['group_id'])
        
        return jsonify(rides)
        
    except Exception as e:
        print(f"Error getting rides: {e}")
        return jsonify([]), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        db.command('ping')
        return jsonify({'status': 'healthy', 'database': 'connected'})
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)