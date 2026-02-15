import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Zap, ArrowRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import EventCard from '../components/EventCard';
import { DUMMY_EVENTS } from '../constants/index.js';

/**
 * Home Page - Landing page with hero section, stats, and event showcase
 * Features: Hero section with CTA buttons, statistics, featured events, search bar
 */
const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredEvents, setFilteredEvents] = React.useState(DUMMY_EVENTS);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = DUMMY_EVENTS.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleRegister = (eventId) => {
    console.log(`Registered for event ${eventId}`);
    // Handle event registration here
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-pulse" />
          <div className="absolute w-96 h-96 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 -right-40 animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white animate-slideUp">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Event Registration & Management
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
                Manage events, registrations, and attendees effortlessly. Create amazing experiences for your audience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  Explore Events
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/events/create"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-300 group"
                >
                  Create Event
                  <Zap size={20} />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold mb-1">1,250+</p>
                  <p className="text-primary-100">Events Created</p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">50K+</p>
                  <p className="text-primary-100">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">100K+</p>
                  <p className="text-primary-100">Registrations</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl transform -rotate-6 opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                  alt="Event Conference"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-600">Everything you need to organize and manage events successfully</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              icon={Calendar}
              label="Total Events"
              value="1,250+"
              color="primary"
            />
            <StatCard
              icon={Users}
              label="Active Users"
              value="50K+"
              color="secondary"
            />
            <StatCard
              icon={Zap}
              label="Total Registrations"
              value="100K+"
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Your Next Event</h2>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search events by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-600 text-lg transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, 6).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No events found. Try a different search.</p>
            </div>
          )}

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 group"
            >
              View All Events
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Event?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start creating amazing events today and connect with thousands of attendees worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events/create"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 group"
            >
              Create Event Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;