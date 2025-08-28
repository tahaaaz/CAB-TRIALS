import React from 'react';

const RouteSelection = ({ onRouteSelect }) => {
  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Route</h2>
        <p className="text-gray-600">Choose your travel direction</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => onRouteSelect('62_to_128')}
          className="w-full p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="text-left">
              <div className="text-lg font-semibold">Sector 62</div>
              <div className="text-sm opacity-90">Starting Point</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="text-right">
              <div className="text-lg font-semibold">Sector 128</div>
              <div className="text-sm opacity-90">Destination</div>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => onRouteSelect('128_to_62')}
          className="w-full p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="text-left">
              <div className="text-lg font-semibold">Sector 128</div>
              <div className="text-sm opacity-90">Starting Point</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="text-right">
              <div className="text-lg font-semibold">Sector 62</div>
              <div className="text-sm opacity-90">Destination</div>
            </div>
          </div>
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 text-blue-600 mt-0.5">ℹ️</div>
          <div className="text-sm text-blue-800">
            <strong>How it works:</strong> Select your route, choose whether you're offering or requesting a ride, 
            and we'll match you with other commuters traveling at the same time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSelection;