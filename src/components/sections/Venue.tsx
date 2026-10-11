import { motion } from "motion/react";
import { Clock3, Map, MapPin } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** Venue photo on top, then address and time cards and a full-width Google Maps button. */
export default function Venue({ venue, parts }: { venue: InvitationConfig["venue"]; parts: EventParts }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;

  return (
    <section id="venue" className="card-section bg-gradient-to-b from-[#FFFAF2] to-[#FDF0E4]">
      <SectionTitle eyebrow="Where to find us">Venue &amp; Location</SectionTitle>

      <Reveal className="mt-6">
        <div className="overflow-hidden rounded-2xl border-4 border-white shadow-card">
          <motion.img
            src={photoUrl(venue.image, 900)}
            alt={venue.image.alt}
            width={564}
            height={249}
            loading="lazy"
            decoding="async"
            className="aspect-[16/8] w-full object-cover"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-4 space-y-3">
        <div className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3.5 shadow-soft">
          <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden />
          <p className="font-heading text-[17px] font-semibold leading-tight">
            {venue.name}
            <span className="mt-0.5 block font-text text-[14.5px] font-normal text-cocoa-soft">{venue.address}</span>
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3.5 shadow-soft">
          <Clock3 className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden />
          <p className="font-text text-[14.5px] leading-snug text-cocoa-soft">
            <span className="block font-heading text-[17px] font-semibold text-cocoa">
              {parts.day} {parts.monthLong} {parts.year}
            </span>
            {parts.weekday}, {parts.startTime} - {parts.endTime}
          </p>
        </div>
        <motion.a whileTap={{ scale: 0.97 }} href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
          <Map className="h-4 w-4" aria-hidden /> Open in Google Maps
        </motion.a>
      </Reveal>
    </section>
  );
}
