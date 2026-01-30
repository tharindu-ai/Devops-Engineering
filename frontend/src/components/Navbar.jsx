import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthenticated(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		navigate('/');
	};

	return (
		<nav className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-xl font-bold">MyApp</Link>
				<div>
					{isAuthenticated ? (
						<button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
					) : (
						<Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
					)}
				</div>
			</div>
		</nav>
	);
}