"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface MegaMenuProps {
  open: boolean;
  children: ReactNode;
}

/**
 * Reusable animated mega menu container
 */
export default function MegaMenu({ open, children }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="menu"
          aria-hidden={!open}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            absolute left-0 top-full mt-4 w-[720px]
            rounded-2xl
            bg-[#0B0F19]/95 backdrop-blur
            border border-white/10
            shadow-2xl
            z-50
          "
        >
          <div className="grid grid-cols-2 gap-6 p-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
