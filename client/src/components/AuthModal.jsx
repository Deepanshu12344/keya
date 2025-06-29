import React, { useState, useEffect } from 'react';
import { X, Facebook } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setShowEmailForm(false);
    }
  }, [isOpen, mode]);

  // Update mode when initialMode changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`${mode} attempt:`, formData);
      onClose();
      alert(`${mode === 'login' ? 'Login' : 'Registration'} successful!`);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Google ${mode} attempt`);
      onClose();
      alert(`Google ${mode === 'login' ? 'Login' : 'Sign up'} successful!`);
    } catch (error) {
      console.error('Google auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Facebook ${mode} attempt`);
      onClose();
      alert(`Facebook ${mode === 'login' ? 'Login' : 'Sign up'} successful!`);
    } catch (error) {
      console.error('Facebook auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setShowEmailForm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
        disabled={isLoading}
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>

      {/* Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm">
          {!showEmailForm ? (
            // Initial View - Social Login Options
            <div className="text-center">
              <h1 className="text-4xl font-normal text-gray-900 mb-6">
                {mode === 'login' ? 'Log In' : 'Sign Up'}
              </h1>
              
              <p className="text-gray-600 mb-12">
                {mode === 'login' ? (
                  <>
                    New to this site?{' '}
                    <button
                      onClick={switchMode}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already a member?{' '}
                    <button
                      onClick={switchMode}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                      disabled={isLoading}
                    >
                      Log In
                    </button>
                  </>
                )}
              </p>

              <div className="space-y-4">
                {/* Google Button */}
                <button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span>
                    {mode === 'login' ? 'Log in with Google' : 'Sign up with Google'}
                  </span>
                </button>

                {/* Facebook Button */}
                <button
                  onClick={handleFacebookAuth}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Facebook className="h-5 w-5 fill-current" />
                  )}
                  <span>
                    {mode === 'login' ? 'Log in with Facebook' : 'Sign up with Facebook'}
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>
              </div>

              {/* Email Option */}
              <button
                onClick={() => setShowEmailForm(true)}
                disabled={isLoading}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {mode === 'login' ? 'Log in with Email' : 'Sign up with email'}
              </button>
            </div>
          ) : (
            // Email Form View
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-gray-900 mb-6">
                  {mode === 'login' ? 'Log In' : 'Sign Up'}
                </h1>
                
                <p className="text-gray-600">
                  {mode === 'login' ? (
                    <>
                      New to this site?{' '}
                      <button
                        onClick={switchMode}
                        className="text-orange-500 hover:text-orange-600 font-medium"
                        disabled={isLoading}
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already a member?{' '}
                      <button
                        onClick={switchMode}
                        className="text-orange-500 hover:text-orange-600 font-medium"
                        disabled={isLoading}
                      >
                        Log In
                      </button>
                    </>
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      required
                    />
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Confirm Password Field (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>
                        {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </span>
                    </>
                  ) : (
                    <span>
                      {mode === 'login' ? 'Log In' : 'Sign Up'}
                    </span>
                  )}
                </button>
              </form>

              {/* Back to Social Options */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowEmailForm(false)}
                  disabled={isLoading}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  ← Back to other options
                </button>
              </div>

              {/* Terms (Register only) */}
              {mode === 'register' && (
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;