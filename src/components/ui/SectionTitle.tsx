import { motion } from "motion/react";
import { Sprig } from "./Decor";

/**
 * Section heading: a small gold eyebrow line above an italic title flanked by flower sprigs.
 * Title words rise in one after another.
 */
export default function SectionTitle({ children, eyebrow, id }: { children: string; eyebrow?: string; id?: string }) {
  const words = children.split(" ");
  return (
    <header className="relative z-10 text-center">
      {eyebrow && (
        <motion.p
          className="mb-1 font-body text-[11px] font-bold uppercase tracking-[0.28em] text-gold"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="flex items-center justify-center gap-2.5">
        <Sprig className="!w-9" />
        <h2 id={id} className="font-heading text-[27px] font-medium italic leading-tight text-cocoa" aria-label={children}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
            >
              {w}
              {" "}
            </motion.span>
          ))}
        </h2>
        <Sprig flip className="!w-9" />
      </div>
    </header>
  );
}
