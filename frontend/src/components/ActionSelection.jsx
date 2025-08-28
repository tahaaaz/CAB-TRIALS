import React from 'react';

const ActionSelection = ({ selectedRoute, onActionSelect, onBack }) => {
  const routeDisplay = selectedRoute === '62_to_128' 
    ? 'Sector 62 → Sector 128' 
    : 'Sector 128 → Sector 62';

  const actions = [
    {
      id: 'offer_cab',
      title: 'Offer a Vacant Seat in Cab',
      description: 'I have empty seats in my cab and want to share the ride',
      icon: '🚗',
      color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'offer_auto',
      title: 'Offer a Vacant Seat in Auto',
      description: 'I have empty seats in my auto-rickshaw',
      icon: '🛺',
      color: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
    },
    {
      id: 'request_cab',
      title: 'Request a Seat in Cab',
      description: 'I need a ride in a cab',
      icon: '🚗',
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'request_auto',
      title: 'Request a Seat in Auto',
      description: 'I need a ride in an auto-rickshaw',
      icon: '🛺',
      color: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <div className="card">
      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Route Selection
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Action</h2>
        <p className="text-gray-600">Route: <span className="font-semibold">{routeDisplay}</span></p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionSelect(action.id)}
            className={`p-6 bg-gradient-to-r ${action.color} text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg`}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{action.icon}</div>
              <div className="text-lg font-semibold mb-2">{action.title}</div>
              <div className="text-sm opacity-90">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-800 mb-1">🚗 Cab Groups</div>
          <div className="text-green-700">Maximum 4 people per group</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="font-semibold text-yellow-800 mb-1">🛺 Auto Groups</div>
          <div className="text-yellow-700">Maximum 3 people per group</div>
        </div>
      </div>
    </div>
  );
};

export default ActionSelection;