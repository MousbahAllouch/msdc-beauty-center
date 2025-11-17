/**
 * Services Component
 * Displays the beauty center services in a responsive grid
 */

import { Smile, Zap, Droplet, Sparkles, Scissors, Stethoscope, Apple, PaintBucket } from 'lucide-react';

// Service data configuration
const services = [
  {
    icon: Smile,
    title: 'Dentistry',
    description: 'Professional dental care for a bright, healthy smile'
  },
  {
    icon: Zap,
    title: 'Laser',
    description: 'Advanced laser treatments for skin rejuvenation'
  },
  {
    icon: PaintBucket,
    title: 'Carbon',
    description: 'Carbon laser facial for deep cleansing and rejuvenation'
  },
  {
    icon: Sparkles,
    title: 'Skin Care',
    description: 'Customized treatments for radiant, healthy skin'
  },
  {
    icon: Droplet,
    title: 'Nails',
    description: 'Professional manicure and nail art services'
  },
  {
    icon: Scissors,
    title: 'Hairstyle',
    description: 'Expert styling and hair care for every occasion'
  },
  {
    icon: Stethoscope,
    title: 'Dermatology',
    description: 'Medical skin care and dermatological consultations'
  },
  {
    icon: Apple,
    title: 'Nutrition',
    description: 'Personalized nutrition plans for wellness and beauty'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-[rgb(83,168,209)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-[rgb(83,168,209)] transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-6 inline-block p-4 rounded-full bg-[rgb(83,168,209)]/10 group-hover:bg-[rgb(83,168,209)] transition-all duration-300">
                  <Icon className="w-8 h-8 text-[rgb(83,168,209)] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
