import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Zap } from 'lucide-react';
import { formatDate, getDaysRemaining, getAvailabilityPercentage } from '../utils/index.js';

/**
 * Event Card Component
 * Features: Event image, title, location, date, registration count, call-to-action button
 */
const EventCard = ({ event, onRegister }) => {
  const daysRemaining = getDaysRemaining(event.date);
  const availabilityPercentage = getAvailabilityPercentage(event.registrations, event.capacity);
  const isFull = availabilityPercentage >= 100;

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {event.category}
          </span>
        </div>
        {isFull && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Event Full</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition duration-200">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Calendar size={16} className="text-primary-600" />
            <span>{formatDate(event.date)}</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {daysRemaining > 0 ? `${daysRemaining} days left` : 'Happening soon'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MapPin size={16} className="text-primary-600" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Users size={16} className="text-primary-600" />
            <span>
              {event.registrations}/{event.capacity} registered
            </span>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
              style={{ width: `${Math.min(availabilityPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{availabilityPercentage}% capacity filled</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-200 font-medium text-center text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => onRegister && onRegister(event.id)}
            disabled={isFull}
            className={`flex-1 px-4 py-2 rounded-lg transition duration-200 font-medium text-sm flex items-center justify-center gap-1 ${
              isFull
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg'
            }`}
          >
            <Zap size={16} />
            {isFull ? 'Full' : 'Register'}
          </button>
        </div>

        {/* Organizer */}
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
          By <strong>{event.organizer}</strong>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
