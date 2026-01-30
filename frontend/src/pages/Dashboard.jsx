import React from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard. This is a placeholder page after login.</p>
      </main>
    </>
  );
}
