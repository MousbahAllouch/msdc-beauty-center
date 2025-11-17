/**
 * Hero Component
 * Main landing section with gradient background and CTA button
 */

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-[rgb(83,168,209)] to-[rgb(103,188,229)] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center" style={{ marginBottom: '10px' }}>
          <img
            src="/logo.png"
            alt="MSDC Beauty Center Logo"
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide">
          Beauty Center
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto">
          Your destination for comprehensive beauty and wellness services
        </p>

        {/* Call-to-Action Button */}
        <button
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-[rgb(83,168,209)] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Explore Our Services
        </button>
      </div>

      {/* Bottom gradient fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
