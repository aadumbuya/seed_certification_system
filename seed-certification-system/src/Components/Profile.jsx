import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    workPhone: '',
    country: '',
    role: '',
    username: '',
    organization: ''
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsNewUser(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    console.log('Selected role:', role);
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setIsRoleDropdownOpen(false);

    // Direct navigation based on role
    if (role === 'agency') {
      console.log('Navigating directly to agency dashboard (no verification required)');
      navigate('/agency'); // Skip verification for agency role
    } else if (role === 'inspector') {
      console.log('Navigating to verification for inspector');
      navigate('/verification/inspector'); // Inspector requires verification
    } else if (role === 'farmer') {
      console.log('Navigating to certification form for farmer');
      navigate('/certification'); // Redirect farmer to certification form
    } else {
      console.log('Navigating to default dashboard (buyer/distributor)');
      navigate('/dashboard'); // Default for buyer/distributor
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile submitted with user:', user);

    // Save updated user data to localStorage
    localStorage.setItem('userData', JSON.stringify(user));
    setIsNewUser(false);

    // Redirect based on role
    console.log('Redirecting based on role:', user.role);
    if (user.role === 'farmer') {
      console.log('Navigating to /certification');
      navigate('/certification'); // Redirect farmer to certification form
    } else if (user.role === 'inspector') {
      console.log('Navigating to /inspector');
      navigate('/inspector');
    } else if (user.role === 'agency') {
      console.log('Navigating to /agency');
      navigate('/agency'); // Direct navigation for agency
    } else {
      console.log('Navigating to /dashboard (default)');
      navigate('/dashboard'); // Default for buyer/distributor or if role is unset
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password updated:', passwords);
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const getRoleButtonText = () => {
    if (user.role) {
      return `Role: ${user.role}`;
    }
    return isNewUser ? 'Select Role' : 'Select Role';
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
            <div className="flex items-center space-x-3 p-2 hover:bg-green-400 rounded-md">
              <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium">My Profile</span>
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {user.firstName ? `Welcome, ${user.firstName}` : 'Welcome'}
            </h1>
            <div className="relative">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                {getRoleButtonText()}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button onClick={() => handleRoleSelect('farmer')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Farmer (Seed Producer)
                    </button>
                    <button onClick={() => handleRoleSelect('buyer')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Seed Buyer
                    </button>
                    <button onClick={() => handleRoleSelect('distributor')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Distributor
                    </button>
                    <button onClick={() => handleRoleSelect('inspector')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Inspector
                    </button>
                    <button onClick={() => handleRoleSelect('agency')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Agency
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-500 mb-8">Your personal profile info</h2>
          
          <div className="flex justify-center mb-8">
            <button
              className={`flex items-center mr-8 ${activeTab === 'profile' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white flex items-center justify-center mr-2">1</div>
                <span className="text-xl uppercase">PROFILE</span>
              </div>
            </button>
            <button
              className={`flex items-center ${activeTab === 'password' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('password')}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white flex items-center justify-center mr-2">2</div>
                <span className="text-xl uppercase">PASSWORD</span>
              </div>
            </button>
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 mb-1">First name</label>
                  <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Name" required />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-500 mb-1">Personal phone number</label>
                  <div className="flex">
                    <select className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option>+232</option>
                      <option>+234</option>
                      <option>+254</option>
                    </select>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-r-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="44 123 45 67" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-1">Last name</label>
                  <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Surname" required />
                </div>
                <div>
                  <label htmlFor="workPhone" className="block text-sm font-medium text-gray-500 mb-1">Work phone number</label>
                  <div className="flex">
                    <select className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option>+232</option>
                      <option>+234</option>
                      <option>+254</option>
                    </select>
                    <input type="tel" id="workPhone" name="workPhone" value={user.workPhone} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-r-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="44 123 45 67" />
                  </div>
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-1">Username (not your e-mail)</label>
                  <input type="text" id="username" name="username" value={user.username} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Username" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-500 mb-1">Country, City</label>
                  <select id="country" name="country" value={user.country} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                    <option value="">Select country</option>
                    <option value="Sierra Leone, FreeTown">Sierra Leone, FreeTown</option>
                    <option value="Nigeria, Lagos">Nigeria, Lagos</option>
                    <option value="USA, New York">USA, New York</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Your e-mail</label>
                  <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="mail@example.com" required />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-500 mb-1">Organization</label>
                  <input type="text" id="organization" name="organization" value={user.organization} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Organization name" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  {isNewUser ? 'Save info' : 'Correct. Save info'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-500 mb-1">Old password *</label>
                  <input type="password" id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="••••••••••" required />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-500 mb-1">New password *</label>
                  <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="••••••••••" required />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500 mb-1">Confirm new password *</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="••••••••••" required />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;