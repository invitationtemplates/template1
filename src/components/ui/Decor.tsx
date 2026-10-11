import { motion } from "motion/react";
import corner_img from "../../assets/floral-corner.png";
import side from "../../assets/floral-side.png";
import sprig from "../../assets/floral-sprig.png";
import footerFloral from "../../assets/floral-footer.png";
import lantern from "../../assets/lantern.png";
import bulb from "../../assets/bulb.png";

/** Decorative images are hidden from assistive tech and never take pointer events. */
const base = "pointer-events-none select-none";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNER: Record<Corner, { place: string; flip: string; origin: string }> = {
  tl: { place: "left-0 top-0", flip: "", origin: "origin-top-left" },
  tr: { place: "right-0 top-0", flip: "-scale-x-100", origin: "origin-top-left" },
  bl: { place: "left-0 bottom-0", flip: "-scale-y-100", origin: "origin-top-left" },
  br: { place: "right-0 bottom-0", flip: "rotate-180", origin: "origin-top-left" },
};

/**
 * Rose cluster in one of the four corners of a section.
 * Layers: outer div = position + mirroring, motion.div = entrance, img = endless gentle sway,
 * so the three transforms never overwrite each other.
 */
export function FloralCorner({ corner = "tl", flip = false, className = "" }: { corner?: Corner; flip?: boolean; className?: string }) {
  const c = CORNER[flip ? "tr" : corner];
  return (
    <div className={`${base} absolute ${c.place} ${c.flip} ${className}`} aria-hidden>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className={c.origin}
      >
        <img src={corner_img} alt="" width={420} height={440} decoding="async" className={`h-auto w-full ${c.origin} animate-sway`} />
      </motion.div>
    </div>
  );
}

/** Tall garland hugging a side edge of a section. */
export function FloralSide({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`${base} absolute ${flip ? "right-0" : "left-0"} ${className}`} aria-hidden>
      <img
        src={side}
        alt=""
        width={190}
        height={560}
        loading="lazy"
        decoding="async"
        className={`h-auto w-full ${flip ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}

/** Soft floral cluster for the footer's bottom corners. */
export function FloralFooter({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`${base} absolute bottom-0 ${flip ? "right-0" : "left-0"} ${className}`} aria-hidden>
      <img
        src={footerFloral}
        alt=""
        width={460}
        height={520}
        loading="lazy"
        decoding="async"
        className={`h-auto w-full ${flip ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}

/** Tiny leafy sprig used on either side of section headings. */
export function Sprig({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <img
      src={sprig}
      alt=""
      width={110}
      height={56}
      loading="lazy"
      decoding="async"
      aria-hidden
      className={`${base} h-auto w-7 ${flip ? "-scale-x-100" : ""} ${className}`}
    />
  );
}

/** A hanging lantern that swings from its top, optionally with a glowing bulb beside it. */
export function Lantern({ className = "", delay = "0s", size = 26, string = 0 }: { className?: string; delay?: string; size?: number; string?: number }) {
  return (
    <div
      className={`${base} absolute origin-top animate-swing ${className}`}
      style={{ width: size, animationDelay: delay }}
      aria-hidden
    >
      {string > 0 && <span className="relative mx-auto block w-px bg-gold/70" style={{ height: string }} />}
      <span className="absolute left-1/2 top-[70%] h-[70%] w-[260%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.65),rgba(255,214,140,0)_68%)]" />
      <img src={lantern} alt="" width={120} height={360} decoding="async" className="relative h-auto w-full" />
    </div>
  );
}

export function Bulb({ className = "", delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <img
      src={bulb}
      alt=""
      width={40}
      height={120}
      decoding="async"
      aria-hidden
      className={`${base} absolute w-[11px] origin-top animate-swing ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

/** Very faint line-art mandala behind the hero text. */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="-100 -100 200 200" className={`${base} ${className}`} aria-hidden>
      <g fill="none" stroke="#B8863B" strokeWidth="0.6">
        {[96, 78, 60, 40].map((r) => (
          <circle key={r} r={r} strokeOpacity={r === 96 ? 0.5 : 0.4} strokeDasharray={r === 78 ? "1 3" : undefined} />
        ))}
        {petals.map((a) => (
          <path key={a} d="M0 -40 C 10 -56 10 -72 0 -88 C -10 -72 -10 -56 0 -40Z" transform={`rotate(${a})`} strokeOpacity="0.55" />
        ))}
      </g>
    </svg>
  );
}

/** A few blush petals drifting down. Pure CSS transforms, disabled for reduced-motion guests. */
const PETALS: [number, number, number, number][] = [
  [8, 0, 13, 9],
  [28, 4, 15, 11],
  [52, 1.5, 11, 10],
  [70, 6, 14, 12],
  [88, 2.5, 12, 9.5],
];
export function Petals() {
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden`} aria-hidden>
      {PETALS.map(([left, delay, size, dur], i) => (
        <span
          key={i}
          className="absolute -top-4 animate-petal rounded-[60%_40%_60%_40%] bg-gradient-to-br from-cream-rose to-cream-blush opacity-0"
          style={{ left: `${left}%`, width: size, height: size * 1.25, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        />
      ))}
    </div>
  );
}
