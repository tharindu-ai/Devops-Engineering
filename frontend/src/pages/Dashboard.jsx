import React, { useState } from 'react';
import { Plus, Calendar, Users, BarChart3, Heart, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import { DUMMY_EVENTS, DUMMY_USER } from '../constants/index.js';

/**
 * Dashboard Page - User's event management hub
 * Features: View created events, manage registrations, analytics
 */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('my-registrations');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get user's registered events (first 3 from DUMMY_EVENTS)
  const registeredEvents = DUMMY_EVENTS.slice(0, 3);
  const myCreatedEvents = DUMMY_EVENTS.slice(3, 5);

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleted event:', selectedEvent.id);
    setShowDeleteModal(false);
  };

  const handleRegister = (eventId) => {
    alert(`Registered for event ${eventId}`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome, {DUMMY_USER.name}!</h1>
                <p className="text-primary-100 text-lg">Manage your events and registrations</p>
              </div>
              <Link
                to="/events/create"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Create Event
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard
              icon={Calendar}
              label="Registered Events"
              value={registeredEvents.length}
              color="primary"
            />
            <StatCard
              icon={BarChart3}
              label="My Events"
              value={myCreatedEvents.length}
              color="secondary"
            />
            <StatCard
              icon={Users}
              label="Total Attendees"
              value="580"
              color="accent"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('my-registrations')}
              className={`px-6 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'my-registrations'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              My Registrations
            </button>
            <button
              onClick={() => setActiveTab('my-events')}
              className={`px-6 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'my-events'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              My Events
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'account'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Account Settings
            </button>
          </div>

          {/* My Registrations Tab */}
          {activeTab === 'my-registrations' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Events You've Registered For</h2>
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {registeredEvents.map((event) => (
                    <div key={event.id} className="relative">
                      <EventCard event={event} onRegister={handleRegister} />
                      <button
                        onClick={() => handleDelete(event)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                      >
                        <Heart size={20} fill="currentColor" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-card p-12 text-center">
                  <div className="text-6xl mb-4">🎫</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Registrations Yet</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Start exploring events and register for ones that interest you!
                  </p>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
                  >
                    <Calendar size={18} />
                    Browse Events
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* My Events Tab */}
          {activeTab === 'my-events' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Events You've Created</h2>
              {myCreatedEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {myCreatedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <div className="space-y-1 text-gray-600 text-sm mb-4">
                            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                            <p>📍 {event.location}</p>
                            <p>👥 {event.registrations}/{event.capacity} registered</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-all font-medium flex items-center gap-2">
                              <Settings size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(event)}
                              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-card p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Created Yet</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Create your first event and start attracting attendees!
                  </p>
                  <Link
                    to="/events/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
                  >
                    <Plus size={18} />
                    Create Event
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-card p-8 space-y-8">
                {/* Profile Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

                  {/* Profile Info */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {DUMMY_USER.name.charAt(0)}{DUMMY_USER.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{DUMMY_USER.name}</h3>
                      <p className="text-gray-600">{DUMMY_USER.email}</p>
                      <p className="text-sm text-gray-500 mt-1 capitalize">Role: {DUMMY_USER.role}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={DUMMY_USER.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={DUMMY_USER.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Bio
                      </label>
                      <textarea
                        placeholder="Tell us about yourself..."
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                      />
                    </div>

                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Password Section */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h3>
                  <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium flex items-center gap-2">
                    <LogOut size={18} />
                    Logout All Sessions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        title="Remove Event"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        confirmText="Remove"
        cancelText="Cancel"
        isDangerous={true}
      >
        <p className="text-gray-700">
          Are you sure you want to remove "{selectedEvent?.title}" from your {activeTab === 'my-registrations' ? 'registrations' : 'created events'}? 
          This action cannot be undone.
        </p>
      </Modal>

      <Footer />
    </>
  );
};

export default Dashboard;

