/**
 * Contact Model
 * Schema for storing contact form submissions
 */

import mongoose from 'mongoose';

// Define the contact schema
const contactSchema = new mongoose.Schema(
  {
    // Contact person's full name
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    // Contact email address
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },

    // Subject of the inquiry
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters long'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },

    // Message content
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },

    // Status tracking
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },

    // IP address of sender (optional, for security)
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    // Add createdAt and updatedAt timestamps automatically
    timestamps: true,
  }
);

// Create index for better query performance
contactSchema.index({ createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });

// Export the Contact model
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
