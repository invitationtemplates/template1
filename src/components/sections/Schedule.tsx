import { Camera, Flower, Flower2, Music4, UsersRound, UtensilsCrossed } from "lucide-react";
import type { InvitationConfig, ScheduleItem } from "../../types";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const icons: Record<ScheduleItem["icon"], JSX.Element> = {
  arrival: <Flower className="h-6 w-6" />,
  ceremony: <Flower2 className="h-6 w-6" />,
  photography: <Camera className="h-6 w-6" />,
  reception: <UsersRound className="h-6 w-6" />,
  dinner: <UtensilsCrossed className="h-6 w-6" />,
  dance: <Music4 className="h-6 w-6" />,
};

/** The day's six events as a two-column grid of cards, easy to scan on a phone. */
export default function Schedule({ schedule }: { schedule: InvitationConfig["schedule"] }) {
  return (
    <section id="the-wedding" className="card-section bg-gradient-to-b from-[#FFF8EE] to-[#FCE9DA]">
      <SectionTitle eyebrow="The big day">{schedule.heading}</SectionTitle>

      <ol className="relative mt-7 grid grid-cols-2 gap-3">
        {schedule.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={0.07 * i} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-gold-soft/60 bg-white/70 px-3 pb-4 pt-4 text-center shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-soft bg-cream-peach text-gold">
                  {icons[item.icon]}
                </span>
                <p className="mt-3 rounded-full bg-gold/10 px-3 py-0.5 font-body text-[14px] font-bold text-gold-deep">{item.time}</p>
                <h3 className="mt-2 font-heading text-[16px] font-semibold leading-tight">{item.title}</h3>
                <p className="mt-1 font-text text-[13px] leading-snug text-cocoa-soft">{item.subtitle}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
