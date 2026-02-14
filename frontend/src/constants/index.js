/**
 * Global Constants and Configuration
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Event Categories
export const EVENT_CATEGORIES = [
  { id: 'conference', label: 'Conference', icon: '🎤' },
  { id: 'workshop', label: 'Workshop', icon: '🛠️' },
  { id: 'seminar', label: 'Seminar', icon: '📚' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
  { id: 'meetup', label: 'Meetup', icon: '👥' },
  { id: 'webinar', label: 'Webinar', icon: '💻' },
  { id: 'training', label: 'Training', icon: '🎓' },
  { id: 'concert', label: 'Concert', icon: '🎵' },
];

// Event Status
export const EVENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
};

// Dummy Data for Events
export const DUMMY_EVENTS = [
  {
    id: 1,
    title: 'React Conference 2024',
    description: 'Join us for an amazing React conference with industry experts.',
    category: 'conference',
    date: new Date(2024, 2, 15),
    time: '09:00 AM',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    registrations: 342,
    capacity: 500,
    organizer: 'Tech Events Inc.',
    status: 'published',
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    description: 'Learn modern web development techniques from experts.',
    category: 'workshop',
    date: new Date(2024, 2, 20),
    time: '02:00 PM',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    registrations: 125,
    capacity: 200,
    organizer: 'Code Academy',
    status: 'published',
  },
  {
    id: 3,
    title: 'Tech Startup Meetup',
    description: 'Network with founders and investors in the startup ecosystem.',
    category: 'meetup',
    date: new Date(2024, 2, 22),
    time: '06:00 PM',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=300&fit=crop',
    registrations: 89,
    capacity: 150,
    organizer: 'Startup Hub',
    status: 'published',
  },
  {
    id: 4,
    title: 'JavaScript Masterclass',
    description: 'Master advanced JavaScript concepts and best practices.',
    category: 'training',
    date: new Date(2024, 3, 5),
    time: '10:00 AM',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    registrations: 210,
    capacity: 300,
    organizer: 'Dev School',
    status: 'published',
  },
  {
    id: 5,
    title: 'Digital Marketing Summit',
    description: 'Explore the latest trends in digital marketing and growth hacking.',
    category: 'conference',
    date: new Date(2024, 3, 10),
    time: '09:00 AM',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    registrations: 567,
    capacity: 800,
    organizer: 'Marketing Pro',
    status: 'published',
  },
];

// Dummy User Data
export const DUMMY_USER = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  role: 'user',
  registeredEvents: [1, 3],
};

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Events', path: '/events', icon: '📅' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Create Event', path: '/events/create', icon: '➕' },
];
