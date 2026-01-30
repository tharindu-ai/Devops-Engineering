import React from 'react';
import Navbar from '../components/Navbar';


export default function Home() {
return (
<>
<Navbar />
<main className="container mx-auto px-4 py-10">
<h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
<p>This is a simple homepage. Use the Login button in the navbar to navigate to the Login page.</p>
</main>
</>
);
}