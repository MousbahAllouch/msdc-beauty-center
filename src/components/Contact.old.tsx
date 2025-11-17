import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[rgb(83,168,209)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <Phone className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <Mail className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">info@beautycenter.com</p>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 mb-4">
              <MapPin className="w-6 h-6 text-[rgb(83,168,209)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600">123 Beauty Street</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all"
            />

            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[rgb(83,168,209)] focus:outline-none focus:ring-2 focus:ring-[rgb(83,168,209)]/20 transition-all resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[rgb(83,168,209)] text-white py-4 rounded-lg font-medium hover:bg-[rgb(73,158,199)] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-20 text-center text-gray-600">
        <p>&copy; 2025 Beauty Center. All rights reserved.</p>
      </footer>
    </section>
  );
}
