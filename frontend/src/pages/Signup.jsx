import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
const [form, setForm] = useState({ username: '', email: '', password: '' });
const navigate = useNavigate();


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    // save token
    localStorage.setItem('token', data.token);
    // show success and navigate to login page
    alert('Signup successfull');
    console.log('Signed up', data);
    navigate('/login');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


return (
<div className="flex items-center justify-center min-h-screen">
<div className="max-w-md w-full space-y-8">
<div>
<h2 className="mt-6 text-center text-3xl font-extrabold">Create an account</h2>
</div>
<form className="mt-8 space-y-6 bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
<div className="rounded-md shadow-sm -space-y-px">
<div className="mb-4">
<label htmlFor="username" className="sr-only">Username</label>
<input
id="username"
name="username"
required
value={form.username}
onChange={handleChange}
className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
placeholder="Username"
/>
</div>
<div className="mb-4">
<label htmlFor="email" className="sr-only">Email address</label>
<input
id="email"
name="email"
type="email"
required
value={form.email}
onChange={handleChange}
className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
placeholder="Email address"
/>
</div>
<div>
<label htmlFor="password" className="sr-only">Password</label>
<input
id="password"
name="password"
type="password"
required
value={form.password}
onChange={handleChange}
className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
placeholder="Password"
/>
</div>
</div>


<div>
<button
type="submit"
className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
>
Sign up
</button>
</div>


<p className="text-sm text-center">
Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
</p>
</form>
</div>
</div>
);
}