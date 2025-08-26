"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Merienda } from "next/font/google"
const meriendaFont = Merienda({
  subsets: ['latin'],
  weight: "700",
});


export default function Gallery({ venue }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="my-8">
      <h2 className={`${meriendaFont.className} text-3xl font-bold mb-6 text-center text-[#2b2b2b] tracking-wide`}>
     Venue Gallery
      </h2>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {venue ? (
          venue.galleryImages.map((image, i) => (
            <motion.div
              key={i}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Gallery image ${i}`}
                width={400}
                height={250}
                className="rounded-xl object-cover w-full h-48 group-hover:brightness-90 group-hover:grayscale-0 grayscale transition-all"

              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
                View
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No images</p>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background Click Close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedImage(null)}
            ></div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center"
            >
              <Image
                src={selectedImage}
                alt="Selected"
                fill
                className="object-contain rounded-xl shadow-2xl"
              />
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 text-black rounded-full p-2 shadow-lg hover:bg-white transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
