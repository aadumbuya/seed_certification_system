// src/Components/Certificate.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Certificate = () => {
  const { certificateId } = useParams(); // Get certificateId from URL
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    // Fetch the certification application from localStorage using certificateId
    const applications = JSON.parse(localStorage.getItem('certificationApplications')) || [];
    const application = applications.find(app => app.certificateId === certificateId);
    if (application) {
      setCertificateData(application);
    } else {
      // If no matching certificate is found, redirect to login
      navigate('/login');
    }
  }, [certificateId, navigate]);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!certificateData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-green-600 text-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-serif italic">Digital Seed<br />Certification<br />System</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-2 bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">View Certificate</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md mt-8 cursor-pointer" onClick={handleLogout}>
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">Log Out</span>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Seed Certification Application</h1>
              <p className="text-gray-600 mt-2">Below are the details of your certification application.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-green-600 mb-4">Certificate ID: {certificateData.certificateId}</h2>
              <div className="space-y-4">
                <p><strong>Farmer Name:</strong> {certificateData.farmerName}</p>
                <p><strong>Seed Type:</strong> {certificateData.seedType}</p>
                <p><strong>Quantity:</strong> {certificateData.quantity} kg</p>
                <p><strong>Farm Location:</strong> {certificateData.farmLocation}</p>
                <p><strong>Planting Date:</strong> {certificateData.plantingDate}</p>
                <p><strong>Seed Source:</strong> {certificateData.seedSource}</p>
                <p><strong>Description:</strong> {certificateData.description || 'N/A'}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${certificateData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {certificateData.status.charAt(0).toUpperCase() + certificateData.status.slice(1)}
                  </span>
                </p>
              </div>
              {certificateData.status === 'pending' && (
                <p className="mt-4 text-gray-600 italic">Note: Your application is pending approval by the agency. You will be notified once it is approved.</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleLogout}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;