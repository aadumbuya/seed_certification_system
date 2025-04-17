// src/Components/CertificationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CertificationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmerName: '',
    seedType: '',
    quantity: '',
    farmLocation: '',
    plantingDate: '',
    seedSource: '',
    description: '',
    status: 'pending', // Default status for new applications
    certificateId: null // Add certificateId field
  });

  useEffect(() => {
    // Load farmer's name from userData in localStorage
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(prevState => ({
        ...prevState,
        farmerName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Certification Form Submitted:', formData);
    alert('Certification application submitted successfully! You can now view your certificate.');

    // Save the certification application to localStorage
    const existingApplications = JSON.parse(localStorage.getItem('certificationApplications')) || [];
    const newApplicationId = existingApplications.length + 1;
    const certificateId = `CERT-${newApplicationId}`; // Generate a certificate ID
    const newApplication = {
      id: newApplicationId,
      ...formData,
      certificateId
    };
    localStorage.setItem('certificationApplications', JSON.stringify([...existingApplications, newApplication]));

    // Redirect to the certificate page with the generated certificateId
    navigate(`/certificate/${certificateId}`);
  };

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
              <span className="text-lg font-medium">Apply for Certification</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md cursor-pointer" onClick={() => navigate('/profile')}>
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">My Profile</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md mt-8 cursor-pointer" onClick={() => {
              localStorage.removeItem('userData');
              navigate('/login');
            }}>
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
              <p className="text-gray-600 mt-2">Complete this form to apply for seed certification as a farmer. Your application will be reviewed by an agency.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="farmerName" className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    id="farmerName"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Your full name"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="seedType" className="block text-sm font-medium text-gray-700 mb-1">Seed Type</label>
                  <input
                    type="text"
                    id="seedType"
                    name="seedType"
                    value={formData.seedType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Maize, Wheat"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (in kg)</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 1000"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                  <input
                    type="text"
                    id="farmLocation"
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Freetown, Sierra Leone"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <input
                    type="date"
                    id="plantingDate"
                    name="plantingDate"
                    value={formData.plantingDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="seedSource" className="block text-sm font-medium text-gray-700 mb-1">Seed Source</label>
                  <input
                    type="text"
                    id="seedSource"
                    name="seedSource"
                    value={formData.seedSource}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Local Supplier, Imported"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Additional Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Provide any additional details about your seeds or farm..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;