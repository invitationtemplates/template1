import { useEffect, useState, type KeyboardEvent } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Bulb, FloralCorner, Lantern, Mandala, Petals } from "../ui/Decor";

const ease = [0.22, 1, 0.36, 1] as const;

// Petals that burst out of the seal when it is tapped: [angle deg, distance px, size px]
const BURST: [number, number, number][] = Array.from({ length: 16 }, (_, i) => [i * 22.5 + (i % 2) * 8, 110 + ((i * 37) % 110), 10 + ((i * 5) % 9)]);

/**
 * Full-screen "Tap to open" cover shown when the guest first arrives.
 * Tap -> petals burst from the gold seal, the content fades, and the cover shrinks into the seal
 * (an iris reveal) to show the invitation underneath. `onOpenStart` fires synchronously inside
 * the tap, so the invitation (and music, if enabled) can start at that exact moment.
 */
export default function OpeningCover({
  config,
  parts,
  guest,
  onOpenStart,
  onOpened,
}: {
  config: InvitationConfig;
  parts: EventParts;
  guest: string;
  onOpenStart: () => void;
  onOpened: () => void;
}) {
  const { couple, cover, heroPhoto } = config;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [tapped, setTapped] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll behind the cover and put keyboard focus on it.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    scope.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = async () => {
    if (tapped) return;
    setTapped(true);
    onOpenStart();

    if (reduce) {
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      onOpened();
      return;
    }

    animate("[data-seal]", { scale: [1, 0.88, 1.12] }, { duration: 0.5 });
    animate("[data-content]", { opacity: 0, y: -12 }, { duration: 0.5, delay: 0.3 });
    // The cover shrinks into the seal, revealing the invitation that mounted underneath.
    await animate(scope.current, { clipPath: "circle(0% at 50% 76%)" }, { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.45 });
    onOpened();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      ref={scope}
      role="button"
      tabIndex={0}
      aria-label={`${cover.tap}: open the invitation of ${couple.first} and ${couple.second}`}
      onClick={open}
      onKeyDown={onKey}
      style={{ clipPath: "circle(150% at 50% 76%)" }}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-gradient-to-b from-[#FFF9EE] via-[#FDEFE0] to-[#F8DCCB] outline-none"
    >
      <div className="relative mx-auto h-full w-full max-w-[430px]">
        <FloralCorner className="w-[34%]" />
        <FloralCorner flip className="w-[34%]" />
        <Lantern className="left-[11%] top-0" size={28} string={46} delay="0s" />
        <Lantern className="left-[22%] top-0" size={20} string={18} delay="-1.8s" />
        <Bulb className="left-[6%] top-[17%]" delay="-0.8s" />
        <Lantern className="right-[10%] top-0" size={27} string={40} delay="-1s" />
        <Lantern className="right-[21%] top-0" size={19} string={14} delay="-3s" />
        <Bulb className="right-[6%] top-[15%]" delay="-1.6s" />
        <Petals />
        <Mandala className="absolute left-1/2 top-[8%] w-[92%] -translate-x-1/2 opacity-25" />

        {/* Content */}
        <div data-content className="relative flex h-full flex-col items-center px-6 pt-[19svh] text-center">
          {guest && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }} className="mb-1 font-heading text-[16px] italic text-cocoa-soft">
              {cover.dear} {guest}
            </motion.p>
          )}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }} className="font-body text-[13px] font-bold uppercase tracking-[0.3em] text-gold">
            {cover.invited}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="mt-4 rounded-t-[999px] bg-gradient-to-b from-gold-soft via-gold to-gold-deep p-[3px] shadow-card"
            style={{ width: "min(46vw, 22svh)" }}
          >
            <div className="overflow-hidden rounded-t-[999px] bg-cream-warm p-[2px]">
              <img src={photoUrl(heroPhoto, 600)} alt="" width={462} height={576} className="aspect-[182/228] w-full rounded-t-[999px] object-cover object-[50%_28%]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease, delay: 0.8 }}
            className="gold-text mt-3 animate-shimmer font-script text-[clamp(38px,11.5vw,50px)] leading-[1.15]"
          >
            {couple.first} &amp; {couple.second}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-1 font-body text-[15px] font-semibold tracking-wide text-cocoa">
            {parts.weekday}, {parts.day} {parts.monthLong} {parts.year}
          </motion.p>
        </div>

        {/* Gold seal + prompt */}
        <div className="absolute left-1/2 top-[76%] -translate-x-1/2 -translate-y-1/2">
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 1.2 }}>
            <div data-seal className="relative grid h-[84px] w-[84px] place-items-center">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-gold/70 [animation-duration:2.2s] motion-reduce:hidden" />
              <span aria-hidden className="absolute -inset-2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(217,178,107,0.55),rgba(217,178,107,0)_70%)]" />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#F1D58F,#C9984A_55%,#9A6E27)] shadow-[0_8px_20px_-6px_rgba(120,70,20,0.65),inset_0_0_0_3px_rgba(255,244,210,0.45)]">
                <Heart className="h-8 w-8 fill-white/90 text-white" aria-hidden />
              </span>
            </div>
          </motion.div>

          {/* Petal burst from the seal when tapped */}
          {tapped &&
            !reduce &&
            BURST.map(([angle, dist, size], i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-[60%_40%_60%_40%] bg-gradient-to-br from-cream-rose to-cream-blush"
                style={{ width: size, height: size * 1.25, marginLeft: -size / 2, marginTop: -size / 2 }}
                initial={{ x: 0, y: 0, opacity: 0.95, rotate: 0, scale: 0.6 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * dist,
                  y: Math.sin((angle * Math.PI) / 180) * dist - 30,
                  opacity: 0,
                  rotate: angle + 140,
                  scale: 1,
                }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            ))}
        </div>

        <motion.p
          data-content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute inset-x-0 top-[calc(76%+62px)] animate-pulse text-center font-body text-[14px] font-bold uppercase tracking-[0.3em] text-cocoa"
        >
          {cover.tap}
        </motion.p>
      </div>
    </div>
  );
}
