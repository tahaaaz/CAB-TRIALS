import React, { useState } from 'react';

const RequestForm = ({ selectedRoute, selectedAction, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    timeSlot: ''
  });

  const routeDisplay = selectedRoute === '62_to_128' 
    ? 'Sector 62 → Sector 128' 
    : 'Sector 128 → Sector 62';

  const actionTitles = {
    offer_cab: 'Offering a Vacant Seat in Cab',
    offer_auto: 'Offering a Vacant Seat in Auto',
    request_cab: 'Requesting a Seat in Cab',
    request_auto: 'Requesting a Seat in Auto'
  };

  const timeSlots = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.contact && formData.timeSlot) {
      onSubmit({
        ...formData,
        route: selectedRoute,
        action: selectedAction
      });
    }
  };

  const isFormValid = formData.name && formData.contact && formData.timeSlot;

  return (
    <div className="card">
      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Action Selection
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Details</h2>
        <div className="space-y-1">
          <p className="text-gray-600">Route: <span className="font-semibold">{routeDisplay}</span></p>
          <p className="text-gray-600">Action: <span className="font-semibold">{actionTitles[selectedAction]}</span></p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="input-field"
            placeholder="+91 98765 43210"
            required
          />
        </div>
        
        <div>
          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-2">
            {selectedAction.startsWith('offer') ? 'Departure Time *' : 'Preferred Time *'}
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 text-blue-600 mt-0.5">💡</div>
            <div className="text-sm text-blue-800">
              <strong>What happens next?</strong>
              <ul className="mt-2 space-y-1">
                <li>• If there's an immediate match, you'll be connected instantly</li>
                <li>• Otherwise, you'll be added to a waiting pool</li>
                <li>• Groups form automatically when enough people join</li>
                <li>• You'll receive contact details of your group members</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex-1 ${
              isFormValid 
                ? 'btn-primary' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-lg'
            }`}
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;