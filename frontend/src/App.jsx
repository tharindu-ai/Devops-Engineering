import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EventCreate from './pages/EventCreate';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';

/**
 * App Component - Main routing component
 * Routes:
 * - / : Home page
 * - /login : Login page
 * - /signup : Signup page
 * - /dashboard : User dashboard
 * - /events : Event listing page
 * - /events/:id : Event details page
 * - /events/create : Create new event
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/create" element={<EventCreate />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
}