# Event Registration Backend API

A Node.js/Express backend for the Event Registration Management system with MongoDB integration.

## Features

- 🔐 User authentication (signup/login with JWT)
- 📅 Event management (create, read, update, delete)
- 👤 Event registration system
- 🔒 Protected routes with token verification
- 📊 Event filtering and search
- ✅ Input validation and error handling
- 🛡️ CORS enabled for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

## Dependencies

```json
{
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.18.1"
}
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (local or cloud instance)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event-registration
JWT_SECRET=your_secure_secret_key
FRONTEND_URL=http://localhost:5173
```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 201 Created
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Events Routes

#### Get All Events
```
GET /api/events?category=conference&search=tech

Response: 200 OK
{
  "events": [
    {
      "_id": "...",
      "title": "React Conference 2024",
      "description": "Amazing conference...",
      "category": "conference",
      "date": "2024-03-15T00:00:00.000Z",
      "time": "09:00 AM",
      "location": "San Francisco, CA",
      "image": "https://...",
      "capacity": 500,
      "registrations": 342,
      "organizer": { "name": "Tech Events Inc.", "email": "..." },
      "status": "published"
    }
  ]
}
```

#### Get Event by ID
```
GET /api/events/:id

Response: 200 OK
{
  "event": { ... }
}
```

#### Create Event
```
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Masterclass",
  "description": "Learn advanced JS concepts",
  "category": "training",
  "date": "2024-04-05",
  "time": "10:00 AM",
  "location": "Boston, MA",
  "capacity": 300,
  "image": "https://..."
}

Response: 201 Created
{
  "message": "Event created successfully",
  "event": { ... }
}
```

#### Update Event
```
PUT /api/events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "capacity": 400
}

Response: 200 OK
{
  "message": "Event updated successfully",
  "event": { ... }
}
```

#### Delete Event
```
DELETE /api/events/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Event deleted successfully"
}
```

### Registrations Routes

#### Register for Event
```
POST /api/registrations
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "123-456-7890"
}

Response: 201 Created
{
  "message": "Successfully registered for event",
  "registration": { ... }
}
```

#### Get User's Registrations
```
GET /api/registrations
Authorization: Bearer <token>

Response: 200 OK
{
  "registrations": [
    {
      "_id": "...",
      "user": "...",
      "event": { "title": "React Conference 2024", ... },
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "123-456-7890",
      "registrationDate": "2024-02-14T..."
    }
  ]
}
```

#### Unregister from Event
```
DELETE /api/registrations/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Successfully unregistered from event"
}
```

#### Get Event Registrations (Organizer Only)
```
GET /api/registrations/event/:eventId
Authorization: Bearer <token>

Response: 200 OK
{
  "registrations": [
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "123-456-7890",
      "user": { "name": "Jane Doe", "email": "jane@example.com" }
    }
  ]
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Get a token from `/api/auth/login` or `/api/auth/signup`
2. Include the token in request headers:
```
Authorization: Bearer <your_jwt_token>
```

The token is valid for 24 hours. After expiration, users need to login again.

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input or missing required fields
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User not authorized for this action
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error (check logs)

Error Response Format:
```json
{
  "message": "Error description"
}
```

## Database Models

### User
- `name`: String (required)
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `createdAt`, `updatedAt`: Timestamps

### Event
- `title`: String (required)
- `description`: String (required)
- `category`: String (enum)
- `date`: Date (required)
- `time`: String (required)
- `location`: String (required)
- `image`: String
- `capacity`: Number (required)
- `registrations`: Number
- `organizer`: ObjectId (User reference)
- `status`: String (enum)
- `createdAt`, `updatedAt`: Timestamps

### Registration
- `user`: ObjectId (User reference)
- `event`: ObjectId (Event reference)
- `name`: String
- `email`: String
- `phone`: String
- `registrationDate`: Date
- `createdAt`, `updatedAt`: Timestamps

## Environment Variables

```env
# Server Configuration
PORT=5000                              # Server port

# Database
MONGO_URI=mongodb://localhost:27017/event-registration  # MongoDB connection

# Authentication
JWT_SECRET=your_very_secure_secret_key_here  # Secret for signing JWT tokens

# CORS
FRONTEND_URL=http://localhost:5173    # Frontend origin for CORS
```

## Development

### Project Structure
```
backend/
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── models/
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── routes/
│   ├── auth.js
│   ├── events.js
│   └── registrations.js
├── middleware/
│   └── verifyToken.js
├── server.js
├── package.json
├── .env.example
└── Dockerfile
```

### Best Practices

1. Always use authentication tokens for protected routes
2. Validate all input data
3. Use appropriate HTTP status codes
4. Include meaningful error messages
5. Keep passwords hashed and secure
6. Use HTTPS in production
7. Set strong JWT secret in production

## Docker Support

The backend includes Docker support. Build and run:

```bash
docker build -t event-backend .
docker run -p 5000:5000 --env-file .env event-backend
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env`
- Verify MongoDB is accessible at the specified URL

### Authentication Issues
- Verify JWT token is included in headers
- Check if token has expired
- Ensure `JWT_SECRET` matches between sign and verify

### CORS Errors
- Check `FRONTEND_URL` in `.env`
- Ensure frontend is running at the specified origin
- Verify credentials are enabled in CORS config

## Support

For issues or questions, refer to:
- MongoDB Documentation: https://docs.mongodb.com/
- Express.js Guide: https://expressjs.com/
- JWT Documentation: https://jwt.io/

## License

ISC
