import React, { useState } from 'react';
import { RideService } from './services/rideService';
import RouteSelection from './components/RouteSelection';
import ActionSelection from './components/ActionSelection';
import RequestForm from './components/RequestForm';
import StatusView from './components/StatusView';

function App() {
  const [currentStep, setCurrentStep] = useState('route');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [formData, setFormData] = useState({});
  const [statusData, setStatusData] = useState(null);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentStep('action');
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    // Submit to MongoDB via Flask API
    submitRideRequest(data);
  };

  const submitRideRequest = async (data) => {
    try {
      const rideData = {
        direction: data.route,
        timeSlot: data.timeSlot,
        vehicleType: data.action.includes('cab') ? 'cab' : 'auto',
        actionType: data.action.includes('offer') ? 'offer' : 'request',
        name: data.name,
        contact: data.contact
      };
      
      const result = await RideService.submitRide(rideData);
      setStatusData(result);
    } catch (error) {
      console.error('Error submitting ride:', error);
      setStatusData({
        type: 'error',
        message: 'Sorry, there was an error processing your request.',
        details: 'Please try again later.'
      });
    }
    setCurrentStep('status');
  };

  const handleReset = () => {
    setCurrentStep('route');
    setSelectedRoute('');
    setSelectedAction('');
    setFormData({});
    setStatusData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Co-Ride</h1>
          <p className="text-lg text-gray-600">Hyperlocal Ride-Sharing Platform</p>
          <p className="text-sm text-gray-500 mt-2">Connecting commuters between Sector 62 and Sector 128</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['route', 'action', 'form', 'status'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step 
                    ? 'bg-primary-600 text-white' 
                    : index < ['route', 'action', 'form', 'status'].indexOf(currentStep)
                      ? 'bg-success-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-0.5 ${
                    index < ['route', 'action', 'form', 'status'].indexOf(currentStep)
                      ? 'bg-success-500'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 'route' && (
            <RouteSelection onRouteSelect={handleRouteSelect} />
          )}
          
          {currentStep === 'action' && (
            <ActionSelection 
              selectedRoute={selectedRoute}
              onActionSelect={handleActionSelect}
              onBack={() => setCurrentStep('route')}
            />
          )}
          
          {currentStep === 'form' && (
            <RequestForm 
              selectedRoute={selectedRoute}
              selectedAction={selectedAction}
              onSubmit={handleFormSubmit}
              onBack={() => setCurrentStep('action')}
            />
          )}
          
          {currentStep === 'status' && (
            <StatusView 
              statusData={statusData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;