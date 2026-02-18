"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/logos/google.svg", name: "Google" },
  { src: "/logos/microsoft.svg", name: "Microsoft" },
  { src: "/logos/amazon.svg", name: "Amazon" },
  { src: "/logos/meta.svg", name: "Meta" },
  { src: "/logos/netflix.svg", name: "Netflix" },
  { src: "/logos/airbnb.svg", name: "Airbnb" },
];

const marqueeVariants: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 28,
      ease: "linear",
    },
  },
};

export default function TrustLogos() {
  return (
    <section className="relative bg-[#0B0F19] pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mb-8"
        >
          Trusted by professionals from leading companies
        </motion.p>

        <div
          className="relative overflow-hidden"
          aria-label="Trusted companies"
        >
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex gap-14 w-max group"
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center min-w-[120px]"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={32}
                  className="h-7 w-auto opacity-60 transition group-hover:opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}