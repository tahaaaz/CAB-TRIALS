import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export class RideService {
  // Submit a new ride request or offer
  static async submitRide(rideData) {
    const { direction, timeSlot, vehicleType, actionType, name, contact } = rideData;
    
    try {
      const response = await axios.post(`${API_BASE_URL}/submit-ride`, {
        direction,
        timeSlot,
        vehicleType,
        actionType,
        name,
        contact
      });
      
      return response.data;
      
    } catch (error) {
      console.error('Error submitting ride:', error);
      
      if (error.response) {
        // Server responded with error status
        return error.response.data;
      } else if (error.request) {
        // Request was made but no response received
        return {
          type: 'error',
          message: 'Unable to connect to server',
          details: 'Please check if the backend server is running and try again.'
        };
      } else {
        // Something else happened
        return {
          type: 'error',
          message: 'An unexpected error occurred',
          details: 'Please try again later.'
        };
      }
    }
  }
  
  // Get all rides for a specific time slot and direction (for debugging)
  static async getRidesForSlot(direction, timeSlot, vehicleType) {
    try {
      const response = await axios.get(`${API_BASE_URL}/rides/${direction}/${timeSlot}/${vehicleType}`);
      return response.data;
    } catch (error) {
      console.error('Error getting rides:', error);
      return [];
    }
  }
  
  // Health check
  static async healthCheck() {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy', error: error.message };
    }
  }
}