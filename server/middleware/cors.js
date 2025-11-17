/**
 * CORS Configuration Middleware
 * Handles Cross-Origin Resource Sharing settings
 */

/**
 * CORS options configuration
 */
export const corsOptions = {
  // Allow requests from the frontend URL
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Allow credentials (cookies, authorization headers)
  credentials: true,

  // Allow specific HTTP methods
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  // Allow specific headers
  allowedHeaders: ['Content-Type', 'Authorization'],

  // Cache preflight requests for 24 hours
  maxAge: 86400,
};
