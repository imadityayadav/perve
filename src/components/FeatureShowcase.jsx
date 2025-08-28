import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Dynamic Island",
    body: "Interact with notifications, music, calls, and activities seamlessly in the new Dynamic Island.",
    image: "https://unblast.com/wp-content/uploads/2023/08/iPhone-14-Pro-Mockup-4.jpg",
  },
  {
    id: 2,
    title: "Always-On Display",
    body: "Glance at time, widgets, and notifications without waking your iPhone.",
    image: "https://unblast.com/wp-content/uploads/2023/07/iPhone-14-Pro-Mockup-3.jpg",
  },
  {
    id: 3,
    title: "48MP Main Camera",
    body: "Capture stunning detail with the powerful 48MP camera and improved Night mode.",
    image: "https://unblast.com/wp-content/uploads/2023/08/iPhone-14-Pro-Max-Mockup.jpg",
  },
  {
    id: 4,
    title: "A16 Bionic Chip",
    body: "Experience blazing performance and efficiency with Apple’s fastest smartphone chip yet.",
    image: "https://unblast.com/wp-content/uploads/2025/08/phone-with-cover-mockup.jpg",
  },
  {
    id: 5,
    title: "Emergency SOS via Satellite",
    body: "Stay safe with crash detection and satellite connectivity when you’re off the grid.",
    image: "https://unblast.com/wp-content/uploads/2025/04/Levitating-iPhone-Mockup.jpg",
  },
];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  // Auto-advance on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > windowHeight / 2) {
        const scrollProgress =
          (windowHeight - rect.top) / (rect.height + windowHeight);
        const newIndex = Math.min(
          features.length - 1,
          Math.floor(scrollProgress * features.length)
        );
        setActive(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prevFeature = () =>
    setActive((prev) => (prev > 0 ? prev - 1 : features.length - 1));
  const nextFeature = () =>
    setActive((prev) => (prev < features.length - 1 ? prev + 1 : 0));

  return (
    <section ref={sectionRef} className="relative mt-5">
      {/* Parent wrapper gives enough scroll height */}
      <div className="h-[500vh] relative">
        {/* Sticky showcase inside */}
        <div className="sticky top-0 h-screen flex items-center">
          {/* Fixed-width content */}
          <div className="w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 relative">
            
            {/* Left Arrow (hidden on mobile) */}
            <button
              onClick={prevFeature}
              className="absolute hidden md:flex left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Left Side - Image */}
            <div className="relative flex flex-col items-center text-center md:text-left">
              <div className="w-64 h-[450px] md:w-80 md:h-[520px] bg-gray-200 rounded-[2rem] shadow-lg overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={features[active].id}
                    src={features[active].image}
                    alt={features[active].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold">{features[active].title}</h2>
                <p className="mt-2 text-gray-600">{features[active].body}</p>
              </div>
            </div>

            {/* Right Side - Points */}
            <div className="flex flex-col gap-6 mx-auto">
              {features.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setActive(idx)}
                  className="flex items-center gap-3 text-left group"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 ${
                      active === idx
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400 group-hover:border-blue-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      active === idx ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {f.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextFeature}
              className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
