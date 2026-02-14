import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Share2, Heart, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Footer from '../components/Footer';
import { DUMMY_EVENTS } from '../constants/index.js';
import { formatDate, getDaysRemaining } from '../utils/index.js';

/**
 * Event Details Page - View full event details and register
 * Features: Event info, speaker details, registration form, share options
 */
const EventDetails = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  // Get event from DUMMY_EVENTS
  const event = DUMMY_EVENTS.find((e) => e.id === parseInt(id)) || DUMMY_EVENTS[0];
  const spotsLeft = event.capacity - event.registrations;
  const daysRemaining = getDaysRemaining(event.date);

  const handleRegistration = () => {
    setFormData({ name: '', email: '', phone: '' });
    setShowModal(true);
  };

  const handleRegisterSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      setIsRegistered(true);
      setShowModal(false);
      console.log('Registered:', formData);
    } else {
      alert('Please fill in all fields');
    }
  };

  const speakers = [
    {
      name: 'Sarah Johnson',
      title: 'Event Organizer',
      company: 'Event Corp',
      image: '👩‍💼',
    },
    {
      name: 'Mike Chen',
      title: 'Event Manager',
      company: 'Tech Events',
      image: '👨‍💼',
    },
  ];

  const agenda = [
    { time: '9:00 AM', activity: 'Registration & Breakfast' },
    { time: '9:30 AM', activity: 'Welcome & Introduction' },
    { time: '10:00 AM', activity: 'Main Session' },
    { time: '12:00 PM', activity: 'Lunch Break' },
    { time: '1:00 PM', activity: 'Breakout Sessions' },
    { time: '3:00 PM', activity: 'Coffee Break' },
    { time: '3:30 PM', activity: 'Closing Session' },
    { time: '5:00 PM', activity: 'Networking & Wrap-up' },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Event Header */}
        <section className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Event Image */}
              <div className="md:col-span-1 flex items-center justify-center">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
              </div>

              {/* Event Title & Basic Info */}
              <div className="md:col-span-2">
                <div className="mb-4 inline-block bg-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
                <div className="space-y-3 text-primary-100">
                  <div className="flex items-center gap-2 text-lg">
                    <Calendar size={20} />
                    <span>{formatDate(event.date)} at {event.time}</span>
                    <span className="ml-2 bg-primary-700 px-3 py-1 rounded-full text-sm">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Happening soon'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-lg">
                    <MapPin size={20} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-lg">
                    <Users size={20} />
                    <span>{event.registrations} registered • {spotsLeft} spots left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  Join us for {event.title}. This is a {event.category} event organized by {event.organizer}. 
                  Learn from industry experts and connect with like-minded professionals. 
                  With {spotsLeft} spots still available, don't miss this opportunity!
                </p>
              </div>

              {/* Agenda */}
              <div className="bg-white rounded-lg shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Agenda</h2>
                <div className="space-y-4">
                  {agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-32 font-semibold text-primary-600 flex-shrink-0">{item.time}</div>
                      <div className="flex-1 py-2 border-l-2 border-primary-200 pl-4">
                        <p className="text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="bg-white rounded-lg shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {speakers.map((speaker, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
                      <div className="text-6xl mb-4">{speaker.image}</div>
                      <h3 className="text-xl font-bold text-gray-900">{speaker.name}</h3>
                      <p className="text-primary-600 font-semibold">{speaker.title}</p>
                      <p className="text-gray-600">{speaker.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              {/* Registration Card */}
              <div className="bg-white rounded-lg shadow-card p-8 sticky top-20">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm">Ticket Price</p>
                  <p className="text-4xl font-bold text-primary-600">Free</p>
                </div>

                {/* Availability */}
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold flex items-center gap-2">
                    <Check size={20} />
                    <span>{spotsLeft} spots available</span>
                  </p>
                </div>

                {/* Registration Button */}
                {isRegistered ? (
                  <div className="mb-6 p-4 bg-green-100 border border-green-500 rounded-lg">
                    <p className="text-green-700 font-semibold flex items-center gap-2">
                      <Check size={20} />
                      <span>Successfully Registered!</span>
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleRegistration}
                    disabled={spotsLeft === 0}
                    className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {spotsLeft === 0 ? 'Event Full' : 'Register Now'}
                  </button>
                )}

                {/* Share Buttons */}
                <div className="flex gap-2 mb-6">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart size={18} className="mx-auto" />
                  </button>
                </div>

                {/* Event Details */}
                <div className="space-y-4 text-sm text-gray-700 border-t border-gray-200 pt-4">
                  <div>
                    <p className="font-semibold text-gray-900">Event Type</p>
                    <p className="capitalize">{event.category}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Capacity</p>
                    <p>{event.capacity} attendees</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p>{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={showModal}
        title="Register for Event"
        onClose={() => setShowModal(false)}
        onConfirm={handleRegisterSubmit}
        confirmText="Register"
        cancelText="Cancel"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default EventDetails;
