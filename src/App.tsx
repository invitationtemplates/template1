import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { invitation } from "./data/invitation";
import { eventParts } from "./lib/dates";
import { readGuest } from "./lib/guest";
import { photoUrl } from "./lib/image";
import Navbar from "./components/sections/Navbar";
import OpeningCover from "./components/sections/OpeningCover";
import Hero from "./components/sections/Hero";
import SaveTheDate from "./components/sections/SaveTheDate";
import LoveStory from "./components/sections/LoveStory";
import Schedule from "./components/sections/Schedule";
import Gallery from "./components/sections/Gallery";
import Rsvp from "./components/sections/Rsvp";
import Venue from "./components/sections/Venue";
import Footer from "./components/sections/Footer";
import MusicPlayer from "./components/ui/MusicPlayer";

type Stage = "closed" | "opening" | "open";

/**
 * Page composition. All content comes from src/data/invitation.ts; every section is its own component.
 *
 * Flow: the "Tap to open" cover is shown first. The invitation mounts the moment it is tapped, so its
 * entrance animations play underneath while the cover shrinks away.
 */
export default function App() {
  const { event, couple } = invitation;
  const parts = useMemo(() => eventParts(event.start, event.end, event.timezone), [event.start, event.end, event.timezone]);
  const title = `${couple.first} & ${couple.second} · Wedding Invitation`;
  const guest = useMemo(readGuest, []);
  const [stage, setStage] = useState<Stage>("closed");

  // Warm the hero photo while the guest is looking at the cover.
  useEffect(() => {
    const img = new Image();
    img.src = photoUrl(invitation.heroPhoto, 800);
  }, []);

  // Always begin at the top, even after a reload that restored a scroll position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    // "user" makes Motion skip movement-based animation when the device asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <div className="page">
        {stage !== "closed" && (
          <>
            <Navbar nav={invitation.nav} title={title} />
            <main>
              <Hero config={invitation} parts={parts} />
              <SaveTheDate parts={parts} start={event.start} />
              <LoveStory story={invitation.story} />
              <Schedule schedule={invitation.schedule} />
              <Gallery gallery={invitation.gallery} />
              <Rsvp rsvp={invitation.rsvp} />
              <Venue venue={invitation.venue} parts={parts} />
            </main>
            <Footer config={invitation} />
          </>
        )}
        <MusicPlayer src={invitation.musicSrc} autoStart={stage !== "closed" && invitation.musicOnOpen} />
      </div>

      {stage !== "open" && (
        <OpeningCover
          config={invitation}
          parts={parts}
          guest={guest}
          onOpenStart={() => setStage("opening")}
          onOpened={() => {
            setStage("open");
            window.scrollTo(0, 0);
          }}
        />
      )}
    </MotionConfig>
  );
}
