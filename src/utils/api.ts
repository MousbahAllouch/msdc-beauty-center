/**
 * API Utility Functions
 * Handles all API requests to the backend server
 */

// Get API URL from environment variables
// In production, use relative path (same domain). In development, use localhost.
const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

/**
 * Submit contact form to backend
 * @param formData - Contact form data
 * @returns Promise with API response
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // Handle non-successful HTTP status codes
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit form');
    }

    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
};
