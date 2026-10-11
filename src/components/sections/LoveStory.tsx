import { motion } from "motion/react";
import { Coffee, Heart } from "lucide-react";
import type { InvitationConfig, TimelineItem } from "../../types";
import { photoUrl } from "../../lib/image";
import { FloralCorner } from "../ui/Decor";
import { RingIcon } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const icons: Record<TimelineItem["icon"], JSX.Element> = {
  heart: <Heart className="h-5 w-5 fill-gold text-gold" />,
  coffee: <Coffee className="h-5 w-5" />,
  ring: <RingIcon className="h-[22px] w-[22px]" />,
};

/** Framed photo on top, then the three-step timeline with large, readable text. */
export default function LoveStory({ story }: { story: InvitationConfig["story"] }) {
  return (
    <section id="our-story" className="card-section bg-gradient-to-b from-[#FFFAF2] to-[#FDEFE2]">
      <FloralCorner className="w-[20%]" />
      <FloralCorner corner="br" className="w-[24%]" />

      <SectionTitle eyebrow="How it began">{story.heading}</SectionTitle>

      <Reveal className="relative mx-auto mt-7 w-[72%] max-w-[260px]">
        <div className="-rotate-2 rounded-[22px] bg-white p-2 shadow-card">
          <div className="overflow-hidden rounded-2xl">
            <motion.img
              src={photoUrl(story.photo, 700)}
              alt={story.photo.alt}
              width={438}
              height={564}
              loading="lazy"
              decoding="async"
              className="aspect-[148/190] w-full object-cover"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </Reveal>

      <ol className="relative mx-auto mt-8 max-w-[330px]">
        <span aria-hidden className="absolute bottom-8 left-[23px] top-8 border-l-2 border-dotted border-gold" />
        {story.items.map((item, i) => (
          <Reveal key={item.title} from={i % 2 ? "right" : "left"} delay={0.1 * i} className="relative pb-6 last:pb-0">
            <li className="flex items-start gap-4">
              <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-soft bg-white text-gold shadow-soft">
                {icons[item.icon]}
              </span>
              <div className="rounded-2xl bg-white/60 px-4 py-3 shadow-soft">
                <h3 className="font-heading text-[17px] font-semibold leading-tight">{item.title}</h3>
                <p className="mt-1 font-text text-[14px] leading-relaxed text-cocoa-soft">{item.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
