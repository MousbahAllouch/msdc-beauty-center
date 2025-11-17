# Beauty Center Full-Stack Website

A modern, full-stack beauty center website built with React, TypeScript, Express, and MongoDB. Features a responsive design, contact form with backend integration, and clean, readable code.

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon components

### Backend
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
project/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── Hero.tsx             # Landing hero section
│   │   ├── Services.tsx         # Services grid
│   │   └── Contact.tsx          # Contact form
│   ├── utils/                   # Utility functions
│   │   └── api.ts               # API helper functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
│
├── server/                       # Backend source code
│   ├── config/                  # Configuration files
│   │   └── database.js          # MongoDB connection setup
│   ├── models/                  # Mongoose models
│   │   └── Contact.js           # Contact schema
│   ├── controllers/             # Route controllers
│   │   └── contactController.js # Contact logic
│   ├── routes/                  # API routes
│   │   └── contactRoutes.js     # Contact endpoints
│   ├── middleware/              # Custom middleware
│   │   ├── errorHandler.js      # Error handling
│   │   └── cors.js              # CORS configuration
│   └── server.js                # Express server entry
│
├── .env                         # Environment variables
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Features

- Responsive single-page design
- Hero section with smooth scroll navigation
- Services grid showcasing 8 beauty services
- Fully functional contact form with validation
- MongoDB integration for storing contact submissions
- RESTful API with Express
- Error handling and validation
- Clean, commented, readable code

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install all frontend and backend dependencies.

### 2. Configure MongoDB

You have two options:

#### Option A: MongoDB Atlas (Recommended - Free Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string
5. Update `.env` file with your connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/beauty_center
```

#### Option B: Local MongoDB

1. Install MongoDB locally: [Installation Guide](https://www.mongodb.com/docs/manual/installation/)
2. Start MongoDB service
3. Use the default connection string in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/beauty_center
```

### 3. Environment Variables

The `.env` file is already set up with default values. Update if needed:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/beauty_center

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Vite Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api
```

### 4. Add Your Logo

To replace the sparkles icon with your logo:

1. Place your logo image in the `public/` directory (e.g., `public/logo.png`)
2. Open `src/components/Hero.tsx`
3. Replace the Sparkles icon:

```tsx
// Before (current):
<Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />

// After (with your logo):
<img src="/logo.png" alt="Logo" className="w-16 h-16" />
```

## Running the Application

### Development Mode

You have three options:

#### Option 1: Run Both Frontend and Backend Together (Recommended)

```bash
npm run start:all
```

This will start:
- Frontend dev server on `http://localhost:5173`
- Backend API server on `http://localhost:5000`

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server:dev
```

#### Option 3: Backend Only (Production Mode)

```bash
npm run server
```

### Production Build

```bash
# Build frontend for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run server` | Start Express server (production) |
| `npm run server:dev` | Start Express server with auto-reload |
| `npm run start:all` | Start both frontend and backend together |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Contact Form

#### Submit Contact Form
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Service Inquiry",
  "message": "I would like to know more about..."
}
```

#### Get All Contacts (Admin)
```
GET /api/contacts?status=new&limit=50&page=1
```

#### Get Single Contact (Admin)
```
GET /api/contacts/:id
```

#### Update Contact Status (Admin)
```
PATCH /api/contacts/:id
Content-Type: application/json

{
  "status": "read"
}
```

## Testing the Contact Form

1. Start both frontend and backend servers
2. Open `http://localhost:5173` in your browser
3. Scroll to the contact form
4. Fill in all fields and click "Send Message"
5. You should see a success message
6. Check your MongoDB database to verify the submission was saved

## Troubleshooting

### Port Already in Use

If port 5173 or 5000 is already in use:

```bash
# Find and kill the process (macOS/Linux)
lsof -ti:5173 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

- Verify your `MONGODB_URI` in `.env` is correct
- Check if MongoDB service is running (local installation)
- Verify network access in MongoDB Atlas (whitelist your IP)

### Form Not Submitting

- Check browser console for errors
- Verify backend server is running on port 5000
- Check `VITE_API_URL` in `.env` matches backend URL

## Database Schema

### Contact Model

```javascript
{
  name: String,        // Required, 2-100 characters
  email: String,       // Required, valid email format
  subject: String,     // Required, 3-200 characters
  message: String,     // Required, 10-2000 characters
  status: String,      // 'new', 'read', 'replied', 'archived'
  ipAddress: String,   // Optional, for security
  createdAt: Date,     // Auto-generated
  updatedAt: Date      // Auto-generated
}
```

## Code Quality

This project follows best practices:

- TypeScript for type safety
- Comprehensive JSDoc comments
- Clear component structure
- Separated concerns (controllers, routes, models)
- Error handling and validation
- Responsive design with Tailwind CSS

## Future Enhancements

- [ ] Add authentication for admin panel
- [ ] Create admin dashboard to view contacts
- [ ] Add email notifications for new contacts
- [ ] Implement booking system
- [ ] Add image gallery
- [ ] Multi-language support

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
