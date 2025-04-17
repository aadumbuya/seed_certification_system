import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerificationForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('VerificationForm mounted with role:', role);
    // If the role is 'agency', redirect directly to the agency dashboard
    if (role === 'agency') {
      console.log('Role is agency, skipping verification and redirecting to /agency');
      navigate('/agency');
    }
  }, [role, navigate]);

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    certifications: '',
    address: '',
    description: '',
    documentFile: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Verification form submitted:', formData);
    alert(`Your ${role} verification request has been submitted and is under review.`);

    // Redirect based on role (excluding agency since it's handled in useEffect)
    if (role === 'inspector') {
      navigate('/inspector');
    }
  };

  // Since agency users are redirected, this form will only render for non-agency roles (e.g., inspector)
  const roleTitle = role === 'inspector' ? 'Inspector' : 'Unknown Role';
  const roleDescription = role === 'inspector'
    ? 'Complete this form to be verified as a Seed Inspector. Your application will be reviewed by authorized agencies.'
    : 'Verification form for this role is not available.';

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-green-600 text-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-serif italic">Digital Seed<br />Certification<br />System</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
                  <path d="M8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4z" />
                  <path d="M15 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <span className="text-lg font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">Company Details</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-lg font-medium">Store Details</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">Seed Capacity</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">Application Complete</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">Payment Method</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md cursor-pointer" onClick={() => navigate('/profile')}>
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">My Profile</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md mt-8 cursor-pointer" onClick={() => navigate('/login')}>
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
              <h1 className="text-2xl font-bold text-gray-800">{roleTitle} Verification</h1>
              <p className="text-gray-600 mt-2">{roleDescription}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">License/Registration Number</label>
                  <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input type="number" id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">Relevant Certifications</label>
                  <input type="text" id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Professional Description</label>
                <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
              </div>
              <div>
                <label htmlFor="documentFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Supporting Documents (Certifications, Licenses, etc.)</label>
                <input type="file" id="documentFile" name="documentFile" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => navigate('/profile')} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;