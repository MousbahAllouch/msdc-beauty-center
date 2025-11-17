/**
 * Error Handling Middleware
 * Centralized error handling for the Express application
 */

/**
 * 404 Not Found Handler
 * Catches requests to undefined routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler
 * Catches all errors and sends appropriate response
 */
export const errorHandler = (err, req, res, next) => {
  // Get status code (default to 500 if not set)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Include stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
