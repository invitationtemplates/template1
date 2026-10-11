import { motion } from "motion/react";
import { Ban, CalendarHeart, MapPin } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Bulb, FloralCorner, Lantern, Mandala, Petals, Sprig } from "../ui/Decor";

const ease = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

/**
 * Hero. On phones the arched portrait sits centred, with the "Reception of" card overlapping its
 * lower edge, so every line stays large enough to read comfortably.
 */
export default function Hero({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, hero, bismillah, heroPhoto, venue } = config;

  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-b-[40px] bg-gradient-to-b from-[#FFF9EE] via-cream to-[#FBEBDB] pb-9 shadow-card"
    >
      <FloralCorner className="w-[26%]" />
      <FloralCorner flip className="w-[26%]" />
      <Lantern className="left-[9%] top-0" size={25} string={36} delay="0s" />
      <Lantern className="left-[18%] top-0" size={19} string={14} delay="-1.8s" />
      <Bulb className="left-[5%] top-[19%]" delay="-0.8s" />
      <Lantern className="right-[8%] top-0" size={24} string={30} delay="-1s" />
      <Lantern className="right-[17%] top-0" size={18} string={10} delay="-3s" />
      <Bulb className="right-[5%] top-[17%]" delay="-1.6s" />
      <Petals />

      <div className="relative px-6 pb-5 pt-7 text-center">
        <Mandala className="absolute left-1/2 top-2 w-[78%] -translate-x-1/2 opacity-30" />
        <motion.p {...enter(0.1)} lang="ar" dir="rtl" className="relative font-arabic text-[19px] leading-loose text-gold">
          {bismillah}
        </motion.p>
        <motion.p {...enter(0.35)} className="relative mt-1 font-body text-[11.5px] font-bold uppercase tracking-[0.18em] text-cocoa">
          {hero.together}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease, delay: 0.55 }}
          className="gold-text relative mt-1 animate-shimmer font-script text-[clamp(40px,12.5vw,52px)] leading-[1.2]"
        >
          {couple.first} &amp; {couple.second}
        </motion.h1>
        <motion.p {...enter(0.95)} className="relative mx-auto mt-1 max-w-[270px] font-body text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-cocoa">
          {hero.invite}
        </motion.p>
      </div>

      {/* Arched portrait */}
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(40% 0 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.4, ease, delay: 0.7 }}
        className="relative mx-auto w-[68%] max-w-[280px] rounded-t-[999px] bg-gradient-to-b from-gold-soft via-gold to-gold-deep p-[4px] shadow-card"
      >
        <div className="overflow-hidden rounded-t-[999px] bg-cream-warm p-[3px]">
          <div className="overflow-hidden rounded-t-[999px]">
            <motion.img
              src={photoUrl(heroPhoto, 800)}
              alt={heroPhoto.alt}
              width={462}
              height={576}
              decoding="async"
              {...({ fetchpriority: "high" } as Record<string, string>)}
              className="aspect-[182/228] w-full object-cover object-[50%_28%]"
              initial={{ scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease }}
            />
          </div>
        </div>
      </motion.div>

      {/* Reception card overlapping the portrait */}
      <motion.aside
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1.1 }}
        className="relative z-10 mx-auto -mt-10 w-[88%] max-w-[350px] rounded-3xl border border-white/80 bg-white/95 px-5 pb-4 pt-5 shadow-card"
        aria-label="Reception details"
      >
        <Sprig className="absolute -right-2 -top-5 w-14" flip />
        <h2 className="text-center font-heading text-[26px] font-semibold italic leading-none text-cocoa">{hero.receptionOf}</h2>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
          <span className="grid place-items-center rounded-lg border border-gold-soft/70 bg-cream-warm/80 px-1 py-2 font-body text-[11.5px] font-bold uppercase tracking-wide">
            {parts.weekday}
          </span>
          <span className="grid h-14 w-14 place-items-center rounded-lg border border-gold-soft bg-cream-peach font-heading text-[30px] leading-none text-gold">
            {parts.day}
          </span>
          <span className="grid place-items-center rounded-lg border border-gold-soft/70 bg-cream-warm/80 px-1 py-2 font-body text-[11.5px] font-bold uppercase tracking-wide">
            {parts.monthShort} {parts.year}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 fill-gold/20 text-gold" aria-hidden />
          <p className="text-left font-heading text-[15px] font-semibold leading-tight">
            {venue.name}
            <span className="mt-0.5 block font-body text-[14px] font-medium text-cocoa-soft">{venue.address}</span>
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2 border-t border-gold-soft/60 pt-3 font-body text-[10.5px] font-bold uppercase leading-snug tracking-wide text-cocoa-soft">
          <li className="flex items-center gap-1.5">
            <CalendarHeart className="h-5 w-5 shrink-0 text-gold" aria-hidden />
            {hero.perks[0]}
          </li>
          <li className="flex items-center gap-1.5">
            <Ban className="h-5 w-5 shrink-0 text-gold" aria-hidden />
            {hero.perks[1]}
          </li>
        </ul>
      </motion.aside>
    </section>
  );
}
