import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Edible from '../../assets/images/edible.jpeg';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup logic
    console.log('Signup with:', formData);
    // Save temporary user data for profile setup
    localStorage.setItem('tempUser', JSON.stringify({ ...formData, role: '' }));
    navigate('/profile');
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <p className="text-green-600 mb-6 text-sm">
            Manage all your seed-tracking needs using Digital Seed Certification System!
            Let's get you set up so you can verify your personal account and begin setting up your seed profile.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="minimum 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone no.</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="minimum 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to all terms, privacy <span className="text-green-600">policies</span> and <span className="text-green-600">fees</span>.
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
      {/* Image on the right */}
      <div className="hidden md:block md:w-1/2">
        <img 
          src={Edible} 
          alt="Seeds in hands" 
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;