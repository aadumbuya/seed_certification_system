import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import SeedImage from '../../assets/images/seeds.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Define redirectBasedOnRole FIRST before using it anywhere
  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'farmer':
        navigate('/farmer/dashboard');
        break;
      case 'inspector':
        navigate('/inspector');
        break;
      case 'agency':
        navigate('/agency');
        break;
      default:
        navigate('/profile');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, rememberMe });

    // Simple mock authentication logic
    // You can modify this later when you have actual APIs
    if (email.includes('@farmer')) {
      redirectBasedOnRole('farmer');
    } else if (email.includes('@inspector')) {
      redirectBasedOnRole('inspector');
    } else if (email.includes('@agency')) {
      redirectBasedOnRole('agency');
    } else {
      // Default path
      redirectBasedOnRole('default');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Login form on the left */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <p className="text-gray-600 mb-6">See your growth and get support!</p>
          
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 mb-4">
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                id="password"
                placeholder="minimum 8 characters"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login
            </button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Not registered yet?{' '}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
      
      {/* Image on the right */}
      <div className="hidden md:block md:w-1/2">
        <img 
          src={SeedImage} 
          alt="Seeds in hands" 
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;