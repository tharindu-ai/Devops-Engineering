# Event Registration & Management System - Frontend Documentation

## 📋 Project Overview

A modern, professional, and feature-rich Event Registration & Management System built with React, Vite, and Tailwind CSS. The application allows users to create, browse, and register for events with an intuitive and responsive user interface.

## 🎯 Key Features

### ✨ Modern UI/UX
- **Gradient backgrounds** for visual appeal
- **Card-style layouts** with hover effects
- **Smooth animations** and transitions
- **Professional color palette** (Primary: Blue, Secondary: Purple, Accent: Orange)
- **Responsive design** for all screen sizes

### 📅 Event Management
- **Browse events** with advanced filtering and search
- **Create new events** with detailed forms
- **View event details** with agenda, speakers, and registration info
- **Register for events** with simple modal forms
- **Manage your events** from personalized dashboard

### 👤 User Features
- **User authentication** (Login & Signup)
- **Personalized dashboard** with registrations and created events
- **Account settings** for profile management
- **Event recommendations** based on interests

### 🎨 UI Components
- **Navbar** with logo, navigation, and user profile menu
- **Footer** with contact info and social links
- **Event Cards** with images, availability bars, and CTAs
- **Stat Cards** for displaying key metrics
- **Toast notifications** for user feedback
- **Modal dialogs** for confirmations
- **Search and filter** functionality

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Home.jsx             # Landing page with hero section
│   │   ├── Login.jsx            # User login page
│   │   ├── Signup.jsx           # User registration page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── EventList.jsx        # Browse all events
│   │   ├── EventCreate.jsx      # Create new event form
│   │   └── EventDetails.jsx     # Event details & registration
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer section
│   │   ├── EventCard.jsx        # Event card component
│   │   ├── StatCard.jsx         # Statistics card
│   │   ├── Modal.jsx            # Modal dialog
│   │   └── Toast.jsx            # Notification toast
│   ├── constants/                # Constants and dummy data
│   │   └── index.js             # Categories, events, users, etc.
│   ├── utils/                    # Utility functions
│   │   └── index.js             # Date, validation, storage helpers
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   ├── App.css                   # Global styles
│   └── index.css                 # Base styles
├── public/                       # Static assets
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette

```css
Primary: #3b82f6 (Blue)        - Main brand color
Secondary: #8b5cf6 (Purple)    - Accents and highlights
Accent: #f97316 (Orange)       - Call-to-action elements

Neutral:
- Light: #f3f4f6
- Medium: #d1d5db
- Dark: #374151
```

### Typography

- **Headings**: Inter Bold (sizes: 3xl, 2xl, xl)
- **Body**: Inter Regular (sizes: base, sm)
- **Accent**: Inter Semibold

### Spacing

- XS: 4px (0.25rem)
- SM: 8px (0.5rem)
- MD: 16px (1rem)
- LG: 24px (1.5rem)
- XL: 32px (2rem)
- 2XL: 48px (3rem)

## 🖼️ Image & Illustration Suggestions

### Hero Section Images
- Conference/event crowd: https://images.unsplash.com/photo-1552664730-d307ca884978
- People networking: https://images.unsplash.com/photo-1552664730-d307ca884978
- Professional setting: https://images.unsplash.com/photo-1543269865-cbf427effbad

### Event Category Icons
```
- Conference: 🎤
- Workshop: 🛠️
- Seminar: 📚
- Networking: 🤝
- Meetup: 👥
- Webinar: 💻
- Training: 🎓
- Concert: 🎵
```

### Placeholder Images
Use Unsplash images for events:
- Tech events: https://images.unsplash.com/photo-1552664730-d307ca884978
- Workshops: https://images.unsplash.com/photo-1517694712202-14dd9538aa97
- Conferences: https://images.unsplash.com/photo-1556761175-5973dc0f32e7

### Avatar Generation
- DiceBear API: `https://api.dicebear.com/7.x/avataaars/svg?seed=NAME`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install lucide-react for icons
npm install lucide-react
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm lint
```

## 📦 Key Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.1",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.4.17"
}
```

## 🔧 Component API Reference

### EventCard Component
```jsx
<EventCard
  event={eventObject}
  onRegister={(eventId) => handleRegister(eventId)}
/>
```

### StatCard Component
```jsx
<StatCard
  icon={CalendarIcon}
  label="Total Events"
  value="1,250+"
  color="primary"
/>
```

### Modal Component
```jsx
<Modal
  isOpen={boolean}
  title="Modal Title"
  onClose={() => {}}
  onConfirm={() => {}}
  confirmText="Confirm"
  cancelText="Cancel"
  isDangerous={false}
>
  {/* Content */}
</Modal>
```

### Toast Component
```jsx
<Toast
  message="Success message"
  type="success" // success | error | warning | info
  duration={4000}
  onClose={() => {}}
/>
```

## 🛠️ Utility Functions

### Date Utilities
```javascript
formatDate(date)              // Format date to readable format
formatTime(time)              // Format time to readable format
formatDateTime(date, time)    // Format both date and time
getDaysRemaining(date)        // Get days until event
isPastDate(date)              // Check if date is in past
isToday(date)                 // Check if date is today
```

### Validation Utilities
```javascript
isValidEmail(email)           // Validate email format
isStrongPassword(password)    // Check password strength
getPasswordStrength(password) // Get password strength label
```

### Text Utilities
```javascript
truncateText(text, maxLength) // Truncate text with ellipsis
getInitials(name)             // Get initials from name
getAvailabilityPercentage()   // Calculate event capacity
```

### Storage Utilities
```javascript
localStorage_.setUser(user)   // Save user to local storage
localStorage_.getUser()       // Get user from local storage
localStorage_.isLoggedIn()    // Check if user is logged in
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md breakpoint)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components use Tailwind CSS responsive utilities:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## 🎯 Best Practices Implemented

### Code Organization
✅ Clear folder structure with separation of concerns
✅ Component-based architecture for reusability
✅ Centralized constants and utilities
✅ Consistent naming conventions

### Performance
✅ Lazy loading with React Router
✅ Component memoization where needed
✅ Optimized re-renders
✅ Efficient state management

### Accessibility
✅ Semantic HTML elements
✅ ARIA labels where necessary
✅ Keyboard navigation support
✅ Color contrast compliance

### UX/UI
✅ Consistent design system
✅ Smooth animations and transitions
✅ Clear error messages
✅ Loading states
✅ Success feedback

### Code Quality
✅ Well-documented components with JSDoc comments
✅ Consistent code formatting
✅ Modular and reusable code
✅ No hardcoded values (using constants)

## 🔐 Security Considerations

- ✅ Input validation on all forms
- ✅ Password strength requirements
- ✅ Secure token storage (localStorage consideration)
- ✅ CORS handling for API calls
- ✅ XSS protection through React

## 🚦 API Integration Ready

All components are prepared for backend integration:

```javascript
// Example API endpoints to connect:
const API_BASE_URL = 'http://localhost:5000/api';

// Authentication
POST   /auth/login        // User login
POST   /auth/signup       // User registration
POST   /auth/logout       // User logout

// Events
GET    /events            // Get all events
GET    /events/:id        // Get event details
POST   /events            // Create new event
PUT    /events/:id        // Update event
DELETE /events/:id        // Delete event

// Registrations
GET    /registrations     // Get user registrations
POST   /registrations     // Register for event
DELETE /registrations/:id // Cancel registration

// Users
GET    /users/:id         // Get user profile
PUT    /users/:id         // Update user profile
```

## 📝 Dummy Data

The application includes realistic dummy data:

```javascript
// 5 sample events with full details
DUMMY_EVENTS = [...]

// 1 sample user
DUMMY_USER = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '...',
  role: 'user',
  registeredEvents: [1, 3]
}

// Event categories
EVENT_CATEGORIES = [
  { id: 'conference', label: 'Conference', icon: '🎤' },
  // ... more categories
]
```

## 🎓 Learning Resources

### Key Technologies
- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 🐛 Troubleshooting

### Issue: Icons not showing
**Solution**: Make sure lucide-react is installed
```bash
npm install lucide-react
```

### Issue: Styles not applying
**Solution**: Ensure Tailwind CSS is properly configured in tailwind.config.js

### Issue: Routing not working
**Solution**: Check that routes are properly defined in App.jsx and BrowserRouter wraps the app in main.jsx

## 📞 Support & Contact

For questions or issues:
- Check the documentation in code comments
- Review Tailwind CSS docs for styling
- Consult component APIs in this README

## 📄 License

This project is part of the Event Registration & Management System.

---

**Created with ❤️ for modern event management**
