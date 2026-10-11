import { motion } from "motion/react";
import type { InvitationConfig } from "../../types";
import { FloralFooter } from "../ui/Decor";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/Icons";
import Ornament from "../ui/Ornament";
import Reveal from "../ui/Reveal";

/** Blush watercolour footer: names, thank-you line, hashtag, social links and copyright. */
export default function Footer({ config }: { config: InvitationConfig }) {
  const { couple, footer, rsvp } = config;
  const social = [
    { href: footer.instagram, label: "Instagram", icon: <InstagramIcon className="h-6 w-6" /> },
    { href: footer.facebook, label: "Facebook", icon: <FacebookIcon className="h-6 w-6" /> },
    { href: `https://wa.me/${rsvp.whatsappNumber}`, label: "WhatsApp", icon: <WhatsAppIcon className="h-6 w-6" /> },
  ];

  return (
    <footer className="relative mt-6 overflow-hidden rounded-t-[40px] bg-[radial-gradient(ellipse_at_50%_0%,#FFF3EA_0%,#FCE3D9_55%,#F9D8CD_100%)] px-5 pb-9 pt-10 text-center shadow-[0_-10px_30px_-18px_rgba(120,70,40,0.35)]">
      <span aria-hidden className="pointer-events-none absolute -bottom-10 -left-12 h-48 w-48 rounded-full bg-[#F4B9B0]/50 blur-2xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-[#F4B9B0]/50 blur-2xl" />
      <FloralFooter className="w-[20%] opacity-50" />
      <FloralFooter flip className="w-[20%] opacity-50" />

      <div className="relative z-10">
        <Reveal>
          <p className="gold-text animate-shimmer font-script text-[clamp(38px,11vw,48px)] leading-[1.15]">
            {couple.first} &amp; {couple.second}
          </p>
          <p className="mt-2 font-text text-[15px] leading-snug text-cocoa">{footer.thanks}</p>
          <p className="mt-2 font-heading text-[16px] font-medium text-gold-deep">{couple.hashtag}</p>
        </Reveal>

        <Reveal delay={0.12} className="mt-5 flex items-center justify-center gap-4">
          {social.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="grid h-12 w-12 place-items-center rounded-full border border-gold-soft bg-white/60 text-gold-deep shadow-soft transition-colors hover:bg-white"
            >
              {s.icon}
            </motion.a>
          ))}
        </Reveal>

        <Ornament className="mt-6" />
        <p className="mt-4 font-text text-[12px] text-cocoa-soft">
          © {new Date().getFullYear()} {couple.first} &amp; {couple.second}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
