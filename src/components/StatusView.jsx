import React from 'react';

const StatusView = ({ statusData, onReset }) => {
  const getStatusIcon = (type) => {
    switch (type) {
      case 'immediate_match':
        return '🎉';
      case 'group_formed':
        return '👥';
      case 'waiting':
        return '⏳';
      default:
        return '✅';
    }
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'immediate_match':
        return 'from-green-500 to-green-600';
      case 'group_formed':
        return 'from-blue-500 to-blue-600';
      case 'waiting':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getStatusColor(statusData.type)} text-white text-2xl mb-4`}>
          {getStatusIcon(statusData.type)}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Status</h2>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {statusData.message}
          </p>
          {statusData.details && (
            <p className="text-gray-600">
              {statusData.details}
            </p>
          )}
        </div>
        
        {statusData.members && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Group Members:</h3>
            <div className="space-y-2">
              {statusData.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{member.name}</span>
                  </div>
                  <a 
                    href={`tel:${member.contact}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    {member.contact}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 text-blue-600 mt-0.5">📱</div>
            <div className="text-sm text-blue-800">
              <strong>Next Steps:</strong>
              <ul className="mt-2 space-y-1">
                {statusData.type === 'immediate_match' && (
                  <>
                    <li>• Contact your match to coordinate pickup details</li>
                    <li>• Confirm the meeting point and time</li>
                    <li>• Share your live location when traveling</li>
                  </>
                )}
                {statusData.type === 'group_formed' && (
                  <>
                    <li>• Create a group chat with all members</li>
                    <li>• Decide on pickup points and exact timing</li>
                    <li>• Share contact details for coordination</li>
                  </>
                )}
                {statusData.type === 'waiting' && (
                  <>
                    <li>• Keep your phone handy for notifications</li>
                    <li>• You'll be contacted once a match is found</li>
                    <li>• Consider flexible timing for faster matches</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={onReset}
            className="btn-primary flex-1"
          >
            Make Another Request
          </button>
          {statusData.type !== 'waiting' && (
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary flex-1"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusView;