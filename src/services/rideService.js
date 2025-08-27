import { supabase } from '../lib/supabase'

export class RideService {
  // Submit a new ride request or offer
  static async submitRide(rideData) {
    const { direction, timeSlot, vehicleType, actionType, name, contact } = rideData
    
    try {
      // First, check for immediate matches
      const match = await this.findImmediateMatch(direction, timeSlot, vehicleType, actionType)
      
      if (match) {
        // Update the matched ride status
        await supabase
          .from('rides')
          .update({ status: 'matched' })
          .eq('id', match.id)
        
        // Insert the new ride with matched status
        const { data: newRide, error } = await supabase
          .from('rides')
          .insert({
            direction,
            time_slot: timeSlot,
            vehicle_type: vehicleType,
            action_type: actionType,
            name,
            contact,
            status: 'matched'
          })
          .select()
          .single()
        
        if (error) throw error
        
        return {
          type: 'immediate_match',
          message: `Great news! You've been matched with ${match.name} (Contact: ${match.contact})`,
          details: 'You can contact them directly to coordinate your ride.',
          matchedWith: match
        }
      }
      
      // No immediate match, insert the ride request
      const { data: newRide, error } = await supabase
        .from('rides')
        .insert({
          direction,
          time_slot: timeSlot,
          vehicle_type: vehicleType,
          action_type: actionType,
          name,
          contact,
          status: 'pending'
        })
        .select()
        .single()
      
      if (error) throw error
      
      // Check if we can form a group
      const groupResult = await this.checkGroupFormation(direction, timeSlot, vehicleType, actionType)
      
      if (groupResult) {
        return groupResult
      }
      
      return {
        type: 'waiting',
        message: `Thank you, ${name}. Your request has been saved.`,
        details: 'We will notify you once your group is formed or a match is found.'
      }
      
    } catch (error) {
      console.error('Error submitting ride:', error)
      throw new Error('Failed to submit ride request')
    }
  }
  
  // Find immediate match (offer matches request and vice versa)
  static async findImmediateMatch(direction, timeSlot, vehicleType, actionType) {
    const oppositeAction = actionType === 'offer' ? 'request' : 'offer'
    
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('direction', direction)
      .eq('time_slot', timeSlot)
      .eq('vehicle_type', vehicleType)
      .eq('action_type', oppositeAction)
      .eq('status', 'pending')
      .limit(1)
    
    if (error) {
      console.error('Error finding match:', error)
      return null
    }
    
    return data.length > 0 ? data[0] : null
  }
  
  // Check if we can form a group
  static async checkGroupFormation(direction, timeSlot, vehicleType, actionType) {
    if (actionType !== 'request') return null // Only requests form groups
    
    const maxMembers = vehicleType === 'cab' ? 4 : 3
    
    // Get all pending requests for this slot
    const { data: pendingRequests, error } = await supabase
      .from('rides')
      .select('*')
      .eq('direction', direction)
      .eq('time_slot', timeSlot)
      .eq('vehicle_type', vehicleType)
      .eq('action_type', 'request')
      .eq('status', 'pending')
    
    if (error || !pendingRequests || pendingRequests.length < maxMembers) {
      return null
    }
    
    // We have enough people to form a group
    const groupMembers = pendingRequests.slice(0, maxMembers)
    
    // Create a new group
    const { data: newGroup, error: groupError } = await supabase
      .from('groups')
      .insert({
        direction,
        time_slot: timeSlot,
        vehicle_type: vehicleType,
        status: 'complete',
        member_count: maxMembers,
        max_members: maxMembers
      })
      .select()
      .single()
    
    if (groupError) {
      console.error('Error creating group:', groupError)
      return null
    }
    
    // Update all group members
    const memberIds = groupMembers.map(member => member.id)
    await supabase
      .from('rides')
      .update({ 
        status: 'grouped',
        group_id: newGroup.id
      })
      .in('id', memberIds)
    
    return {
      type: 'group_formed',
      message: 'Congratulations! A group has been formed for your time slot:',
      members: groupMembers.map(member => ({
        name: member.name,
        contact: member.contact
      }))
    }
  }
  
  // Get ride status by ID
  static async getRideStatus(rideId) {
    const { data, error } = await supabase
      .from('rides')
      .select(`
        *,
        groups (*)
      `)
      .eq('id', rideId)
      .single()
    
    if (error) {
      console.error('Error getting ride status:', error)
      return null
    }
    
    return data
  }
  
  // Get all rides for a specific time slot and direction (for admin/debugging)
  static async getRidesForSlot(direction, timeSlot, vehicleType) {
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('direction', direction)
      .eq('time_slot', timeSlot)
      .eq('vehicle_type', vehicleType)
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error getting rides:', error)
      return []
    }
    
    return data
  }
}