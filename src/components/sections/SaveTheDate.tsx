import { AnimatePresence, motion } from "motion/react";
import { useCountdown } from "../../hooks/useCountdown";
import type { EventParts } from "../../lib/dates";
import { FloralCorner } from "../ui/Decor";
import Ornament from "../ui/Ornament";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** One countdown tile: the number slides in whenever its value changes. */
function Tile({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="rounded-2xl border border-gold-soft/70 bg-white/70 px-1 py-3 text-center shadow-soft">
      <div className="relative h-[42px] overflow-hidden font-heading text-[36px] leading-[42px] text-gold" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-1 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-cocoa">{label}</div>
    </div>
  );
}

/** "Save the Date": weekday / day / month plate and the live countdown in four tiles. */
export default function SaveTheDate({ parts, start }: { parts: EventParts; start: string }) {
  const c = useCountdown(start);
  const summary = c.done
    ? "The wedding day has arrived"
    : `${c.days} days, ${c.hours} hours, ${c.minutes} minutes and ${c.seconds} seconds to go`;

  return (
    <section id="save-the-date" className="card-section bg-gradient-to-b from-[#FFF7EC] to-[#FBE6D6] text-center">
      <FloralCorner className="w-[22%]" />
      <FloralCorner flip className="w-[22%]" />
      <SectionTitle eyebrow="Counting the days">Save the Date</SectionTitle>

      <Reveal className="relative mx-auto mt-6 grid max-w-[340px] grid-cols-[1fr_auto_1fr] items-center gap-2.5">
        <span className="grid h-11 place-items-center rounded-xl bg-cream-peach/90 font-body text-[13px] font-bold uppercase tracking-wide shadow-soft">
          {parts.weekday}
        </span>
        <span className="grid h-[66px] w-[68px] place-items-center rounded-2xl border border-gold-soft bg-cream-peach font-heading text-[40px] leading-none text-gold shadow-card">
          {parts.day}
        </span>
        <span className="grid h-11 place-items-center rounded-xl bg-cream-peach/90 font-body text-[13px] font-bold uppercase tracking-wide shadow-soft">
          {parts.monthLong} {parts.year}
        </span>
      </Reveal>

      <Reveal delay={0.15} className="relative mt-7">
        <p className="sr-only" role="timer">
          {summary}
        </p>
        {c.done ? (
          <p className="font-heading text-[22px] italic text-gold">The celebration has begun!</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            <Tile value={c.days} label="Days" />
            <Tile value={c.hours} label="Hours" />
            <Tile value={c.minutes} label="Mins" />
            <Tile value={c.seconds} label="Secs" />
          </div>
        )}
      </Reveal>

      <Ornament className="mt-7" />
    </section>
  );
}
