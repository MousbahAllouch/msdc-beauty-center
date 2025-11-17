/**
 * Contact Routes
 * Defines API endpoints for contact operations
 */

import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
} from '../controllers/contactController.js';

const router = express.Router();

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact submission
 * @access  Public
 */
router.post('/', createContact);

/**
 * @route   GET /api/contacts
 * @desc    Get all contact submissions (for admin)
 * @access  Public (should be protected with auth in production)
 */
router.get('/', getAllContacts);

/**
 * @route   GET /api/contacts/:id
 * @desc    Get a single contact by ID (for admin)
 * @access  Public (should be protected with auth in production)
 */
router.get('/:id', getContactById);

/**
 * @route   PATCH /api/contacts/:id
 * @desc    Update contact status (for admin)
 * @access  Public (should be protected with auth in production)
 */
router.patch('/:id', updateContactStatus);

export default router;
