/**
 * Contact Component
 * Displays contact information and handles form submissions
 */

import { Phone, Mail, MapPin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { submitContactForm, ContactFormData } from '../utils/api';

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  /**
   * Handle input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus({ type: null, message: '' });

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields',
      });
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        // Success
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Your message has been sent successfully!',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        // Error
        setSubmitStatus({
          type: 'error',
          message: response.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[rgb(83,168,209)] mx-auto"></div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <Phone className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          {/* Email */}
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <Mail className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">info@beautycenter.com</p>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <MapPin className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600">123 Beauty Street</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={6}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            ></textarea>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[rgb(83,168,209)] text-white py-4 rounded-lg font-medium hover:bg-[rgb(73,158,199)] transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600">
        <p>&copy; 2025 Beauty Center. All rights reserved.</p>
      </footer>
    </section>
  );
}
