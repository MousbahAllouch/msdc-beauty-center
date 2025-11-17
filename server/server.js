/**
 * Express Server Configuration
 * Main server entry point for the Beauty Center backend
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, setupDatabaseEvents } from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './middleware/cors.js';

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application
const app = express();

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

/**
 * MIDDLEWARE SETUP
 */

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

/**
 * API ROUTES
 */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Beauty Center API is running',
    timestamp: new Date().toISOString(),
  });
});

// Contact routes
app.use('/api/contacts', contactRoutes);

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

/**
 * ERROR HANDLING
 */

// 404 handler for undefined API routes (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(notFoundHandler);
}

// Global error handler
app.use(errorHandler);

/**
 * DATABASE CONNECTION & SERVER START
 */

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Setup database event handlers
    setupDatabaseEvents();

    // Start Express server
    app.listen(PORT, () => {
      console.log('🚀 Server is running');
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
      console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export app for testing purposes
export default app;
