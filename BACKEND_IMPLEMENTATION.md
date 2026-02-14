# Backend Implementation Summary

## Overview
The backend has been completed to support all frontend functionality. The Event Registration Management system now has a fully functional Node.js/Express backend with MongoDB integration.

## Changes Made

### 1. Database Models

#### User Model (`models/User.js`)
- Changed from `username` field to `name` field to match frontend signup form
- Fields: `name`, `email`, `password`, timestamps
- Email is unique and required

#### Event Model (`models/Event.js`) - NEW
- Comprehensive event management
- Fields:
  - `title`: Event name
  - `description`: Event details
  - `category`: One of 8 categories (conference, workshop, seminar, networking, meetup, webinar, training, concert)
  - `date`: Event date
  - `time`: Event time (e.g., "09:00 AM")
  - `location`: Event location
  - `image`: Event image URL
  - `capacity`: Maximum attendees
  - `registrations`: Current registration count
  - `organizer`: Reference to User who created the event
  - `status`: Event status (draft, published, ongoing, completed, cancelled)
  - Timestamps (createdAt, updatedAt)

#### Registration Model (`models/Registration.js`) - NEW
- Tracks user registrations for events
- Fields:
  - `user`: Reference to User
  - `event`: Reference to Event
  - `name`: Registrant name
  - `email`: Registrant email
  - `phone`: Registrant phone
  - `registrationDate`: When they registered
  - Timestamps
- Unique constraint: A user can only register once per event

### 2. Updated Authentication

#### Auth Controller (`controllers/authController.js`)
- **Changes**:
  - Updated `register()` to accept `name`, `email`, `password` (instead of username)
  - Updated `login()` to accept `email` and `password` (instead of usernameOrEmail)
  - Both endpoints now return `name` instead of `username` in response
  - Removed username uniqueness check, now only email is unique

### 3. New Event Management

#### Event Controller (`controllers/eventController.js`) - NEW
- `getAllEvents()`: GET /api/events
  - Returns all events
  - Supports filtering by category via query param
  - Supports searching by title/description via query param
  - Populates organizer information

- `getEventById()`: GET /api/events/:id
  - Returns specific event details
  - Populates organizer information

- `createEvent()`: POST /api/events (Protected)
  - Creates new event
  - Requires authentication
  - Sets authenticated user as organizer
  - Validates all required fields

- `updateEvent()`: PUT /api/events/:id (Protected)
  - Updates event details
  - Only organizer can update their event
  - Validates authorization

- `deleteEvent()`: DELETE /api/events/:id (Protected)
  - Deletes event
  - Only organizer can delete their event
  - Validates authorization

### 4. New Registration Management

#### Registration Controller (`controllers/registrationController.js`) - NEW
- `registerEvent()`: POST /api/registrations (Protected)
  - User registers for an event
  - Validates event exists and capacity available
  - Prevents duplicate registrations
  - Automatically increments event registration count

- `getUserRegistrations()`: GET /api/registrations (Protected)
  - Returns authenticated user's event registrations
  - Populates event information

- `unregisterEvent()`: DELETE /api/registrations/:id (Protected)
  - User cancels registration
  - Automatically decrements event registration count
  - Only the registered user can delete their registration

- `getEventRegistrations()`: GET /api/registrations/event/:eventId (Protected)
  - Event organizer views all registrations for their event
  - Only organizer can access this endpoint
  - Returns registrant details

### 5. Routes

#### Event Routes (`routes/events.js`) - NEW
```
GET  /api/events              - Get all events (public)
GET  /api/events/:id          - Get event by ID (public)
POST /api/events              - Create event (protected)
PUT  /api/events/:id          - Update event (protected)
DELETE /api/events/:id        - Delete event (protected)
```

#### Registration Routes (`routes/registrations.js`) - NEW
```
POST   /api/registrations              - Register for event (protected)
GET    /api/registrations              - Get user's registrations (protected)
DELETE /api/registrations/:id          - Unregister from event (protected)
GET    /api/registrations/event/:eventId - Get event registrations (protected)
```

#### Auth Routes (`routes/auth.js`) - Updated
```
POST /api/auth/signup  - User signup
POST /api/auth/login   - User login
GET  /api/auth/me      - Get current user info (protected)
```

### 6. Server Configuration (`server.js`)
- Updated to include new event and registration routes
- CORS configured for frontend origin (localhost:5173)
- All three route modules imported and mounted

### 7. Environment Configuration (`.env.example`)
- Created template with required environment variables:
  - `PORT`: Server port (default 5000)
  - `MONGO_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT signing
  - `FRONTEND_URL`: Frontend origin for CORS

## API Compatibility with Frontend

The backend now fully supports the frontend:

### Auth Endpoints ✅
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/signup` - Signup with name/email/password
- `GET /api/auth/me` - Get current user (token required)

### Event Endpoints ✅
- `GET /api/events` - List events (with filtering/search)
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (auth required)
- `PUT /api/events/:id` - Update event (auth required)
- `DELETE /api/events/:id` - Delete event (auth required)

### Registration Endpoints ✅
- `POST /api/registrations` - Register for event (auth required)
- `GET /api/registrations` - Get user's registrations (auth required)
- `DELETE /api/registrations/:id` - Unregister from event (auth required)
- `GET /api/registrations/event/:eventId` - Get event registrations (auth required)

## Setup Instructions

1. Copy `.env.example` to `.env` and add your configuration:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally or update `MONGO_URI` in `.env`

4. Start the server:
   ```bash
   npm run dev
   ```

5. The backend will be available at `http://localhost:5000`

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  date: Date,
  time: String,
  location: String,
  image: String,
  capacity: Number,
  registrations: Number,
  organizer: ObjectId (ref: User),
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Registrations Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  name: String,
  email: String,
  phone: String,
  registrationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **Password Hashing**: Bcryptjs used for secure password storage
2. **JWT Authentication**: Token-based auth for protected routes
3. **Authorization Checks**: Users can only modify their own events/registrations
4. **CORS Protection**: Configured for frontend origin
5. **Input Validation**: All endpoints validate required fields
6. **Unique Constraints**: Prevent duplicate emails and double registrations

## Files Created/Modified

### Created
- `models/Event.js`
- `models/Registration.js`
- `controllers/eventController.js`
- `controllers/registrationController.js`
- `routes/events.js`
- `routes/registrations.js`
- `.env.example`

### Modified
- `models/User.js` - Changed username to name
- `controllers/authController.js` - Updated for frontend format
- `server.js` - Added new routes

## Next Steps (Optional Enhancements)

1. Add image upload functionality (multer)
2. Add event search with Elasticsearch
3. Add role-based access control (admin, organizer)
4. Add email notifications
5. Add event categories management
6. Add user profile endpoint
7. Add pagination for event listings
8. Add soft deletes for events/registrations
9. Add event analytics/reports
10. Add password reset functionality
