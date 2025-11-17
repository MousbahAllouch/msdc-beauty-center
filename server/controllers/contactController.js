/**
 * Contact Controller
 * Handles business logic for contact form operations
 */

import Contact from '../models/Contact.js';

/**
 * Create a new contact submission
 * @route POST /api/contacts
 */
export const createContact = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Get client IP address (for security tracking)
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create new contact document
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Handle other errors
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again.',
    });
  }
};

/**
 * Get all contact submissions (for admin panel - optional)
 * @route GET /api/contacts
 */
export const getAllContacts = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { status, limit = 50, page = 1 } = req.query;

    // Build query filter
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch contacts from database
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(parseInt(limit))
      .skip(skip)
      .select('-ipAddress'); // Exclude IP address from response

    // Get total count for pagination
    const total = await Contact.countDocuments(filter);

    // Send response
    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching contacts',
    });
  }
};

/**
 * Get a single contact by ID (for admin panel - optional)
 * @route GET /api/contacts/:id
 */
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find contact by ID
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the contact',
    });
  }
};

/**
 * Update contact status (for admin panel - optional)
 * @route PATCH /api/contacts/:id
 */
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    // Update contact status
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the contact',
    });
  }
};
