import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ExternalLink, Navigation, ZoomIn } from 'lucide-react';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export function InteractiveMap({ latitude, longitude, address }: InteractiveMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Generate Google Maps embed URL using coordinates
  const getEmbedUrl = () => {
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s`;
  };

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  };

  const getMapUrl = () => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  const handleGetDirections = () => window.open(getDirectionsUrl(), '_blank');
  const handleOpenMap = () => window.open(getMapUrl(), '_blank');
  const handleZoomToLocation = () =>
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}&z=18`, '_blank');

  return (
    <div className="relative">
      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl"
      >
        {/* Interactive Map Iframe */}
        <div className="relative w-full h-[500px] bg-slate-100 dark:bg-slate-900">
          <iframe
            src={getEmbedUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className="w-full h-full"
          />

          {/* Loading State */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Loading map...</p>
              </div>
            </div>
          )}

          {/* Zoom Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleZoomToLocation}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 shadow-lg flex items-center justify-center transition-all group"
            title="Zoom to exact location"
          >
            <ZoomIn className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 transition-colors" />
          </motion.button>
        </div>

        {/* Map Overlay Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-6 left-6 md:max-w-sm w-[90%] sm:w-[400px] bg-white dark:bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 z-[1000] pointer-events-auto"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white mb-2 text-lg font-semibold">
                Our Location
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                {address || `${latitude}, ${longitude}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleGetDirections}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all text-sm"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </button>

                <button
                  onClick={handleOpenMap}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Open Map
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Map Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: MapPin, title: 'Easy to Find', description: 'Located in the heart of the tech district' },
          { icon: Navigation, title: 'Public Transport', description: 'Accessible via metro and bus routes' },
          { icon: ExternalLink, title: 'Parking Available', description: 'Free parking for visitors' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white mb-1 text-sm">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
