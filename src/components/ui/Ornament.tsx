import { motion } from "motion/react";

/** Thin gold rule with a small centre ornament; both halves draw outward from the middle. */
export default function Ornament({ className = "" }: { className?: string }) {
  const view = { once: true } as const;
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`} aria-hidden>
      <motion.span
        className="h-px w-24 origin-right bg-gradient-to-l from-gold-light to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.svg
        viewBox="0 0 40 14"
        className="h-3.5 w-10 text-gold"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <path d="M20 2l4 5-4 5-4-5z" fill="currentColor" />
        <path d="M14 7C10 3 5 3 2 6M26 7c4-4 9-4 12-1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </motion.svg>
      <motion.span
        className="h-px w-24 origin-left bg-gradient-to-r from-gold-light to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
