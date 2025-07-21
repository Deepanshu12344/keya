import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import {AuthContext} from '../context/AuthContext.jsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const {dispatch} = useContext(AuthContext);
  const [mode, setMode] = useState<'login' | 'register' | 'email-login' | 'email-register'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const isRegister = mode === 'register' || mode === 'email-register';
  const url = isRegister
    ? 'http://127.0.0.1:5000/auth/register'
    : 'http://127.0.0.1:5000/auth/login';

  try {

    dispatch({
      type: 'LOGIN_START',
      payload:{
        user: null,
        token: null
      },
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.message || data.error);
      return;
    }

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload:{
        user: data.user,
        token: data.token
      },
    });

    console.log(`${mode} successful`, data);
    // Optionally store token or user info
    if (mode === 'login') {
      localStorage.setItem('token', data.token);
    }

    onClose(); // Close the modal or form
  } catch (error) {
    console.error('Request failed', error);
  }
};


  const renderLoginOptions = () => (
    <div className="space-y-4">
      <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {mode === 'login' ? 'Log in with Google' : 'Sign up with Google'}
      </button>

      <button className="w-full flex items-center justify-center px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors">
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        {mode === 'login' ? 'Log in with Facebook' : 'Sign up with Facebook'}
      </button>

      <div className="text-center text-gray-500">or</div>

      <button 
        onClick={() => setMode(mode === 'login' ? 'email-login' : 'email-register')}
        className="w-full text-gray-700 hover:text-[#7c1034] transition-colors"
      >
        {mode === 'login' ? 'Log in with Email' : 'Sign up with email'}
      </button>
    </div>
  );

  const renderEmailForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 bg-transparent focus:border-[#7c1034] focus:outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 bg-transparent focus:border-[#7c1034] focus:outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 bg-transparent focus:border-[#7c1034] focus:outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      {mode === 'email-register' && (
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 bg-transparent focus:border-[#7c1034] focus:outline-none text-gray-700 placeholder-gray-500"
          />
        </div>
      )}

      {mode === 'email-register' && (
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
            <div className="flex items-center">
              <input type="checkbox" id="recaptcha" className="mr-2" />
              <label htmlFor="recaptcha" className="text-sm text-gray-600">
                I'm not a robot
              </label>
              <div className="ml-4 text-xs text-gray-500">
                reCAPTCHA<br />
                Privacy - Terms
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#7c1034] text-white py-3 rounded-lg hover:bg-[#6b0d2a] transition-colors font-medium"
      >
        {mode === 'email-login' ? 'Log In' : 'Sign Up'}
      </button>

      <div className="text-center text-gray-500">
        or sign {mode === 'email-login' ? 'in' : 'up'} with
      </div>

      <div className="flex justify-center space-x-4">
        <button type="button" className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>
        <button type="button" className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
          <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
      </div>
    </form>
  );

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>

      {/* Modal content */}
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            {mode === 'login' || mode === 'email-login' ? 'Log In' : 'Sign Up'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' || mode === 'email-login' ? (
              <>
                New to this site?{' '}
                <button
                  onClick={() => setMode(mode === 'email-login' ? 'email-register' : 'register')}
                  className="text-[#7c1034] hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already a member?{' '}
                <button
                  onClick={() => setMode(mode === 'email-register' ? 'email-login' : 'login')}
                  className="text-[#7c1034] hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </p>
        </div>

        {mode === 'login' || mode === 'register' ? renderLoginOptions() : renderEmailForm()}
      </div>
    </div>
  );
};

export default AuthModal;