import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate
import FormInput from '../components/FormInput';
import { BACKEND_URL } from '../utils/config.js';

const LoginSignup = () => {
  const navigate = useNavigate();  // <-- Initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // For signup
    userType: 'supplier', // or 'startup'
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '', userType: 'supplier' });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const endpoint = isLogin
      ? '/auth/login'
      : formData.userType === 'supplier'
      ? '/auth/supplier/signup'
      : '/auth/startup/signup';

    fetch(`${BACKEND_URL}/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Something went wrong');

        alert(isLogin ? 'Logged in successfully!' : 'Signed up successfully!');

        // Save token (optional, depends on your app)
        if (data.token) localStorage.setItem('token', data.token);

        if (isLogin) {
          // Use role from backend response to redirect
          const userRole = data.user?.role;

          if (userRole === 'supplier') {
            navigate('/suppliers');
          } else if (userRole === 'startup') {
            navigate('/startups');
          } else {
            navigate('/');
          }
        } else {
          // After signup, optionally navigate to login or dashboard
          navigate('/login');
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
      {!isLogin && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold">User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="supplier">Supplier</option>
            <option value="startup">Startup</option>
          </select>
        </div>
      )}
      {!isLogin && (
        <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
      )}
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button
        onClick={handleSubmit}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <p className="mt-4 text-center text-sm">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button className="text-blue-600 underline" onClick={toggleMode}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginSignup;