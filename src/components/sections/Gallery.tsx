import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { InvitationConfig, Photo } from "../../types";
import { photoUrl } from "../../lib/image";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** Full-screen photo viewer: arrows, swipe, and keys (Esc, left, right). Focus returns to the opener on close. */
function Lightbox({ photos, index, onClose, onChange }: { photos: Photo[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = photos.length;
  const go = useCallback((d: number) => index !== null && onChange((index + d + n) % n), [index, n, onChange]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go, onClose]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            key={index}
            src={photoUrl(photos[index], 1400)}
            alt={photos[index].alt}
            className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream text-cocoa">
            <X className="h-5 w-5" />
          </button>
          {n > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-cocoa"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-cocoa"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One tile of the mosaic. */
function Tile({ photo, onOpen, className = "", delay = 0 }: { photo: Photo; onOpen: () => void; className?: string; delay?: number }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${photo.alt}`}
      className={`group relative overflow-hidden rounded-xl shadow-soft ${className}`}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={photoUrl(photo, 600)}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </motion.button>
  );
}

/** Five-photo mosaic like the reference, with a lightbox. The section hides itself when there are no photos. */
export default function Gallery({ gallery }: { gallery: InvitationConfig["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const { photos } = gallery;
  if (photos.length === 0) return null;

  const show = (i: number, el?: HTMLElement | null) => {
    opener.current = el ?? (document.activeElement as HTMLElement | null);
    setOpen(i);
  };
  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };
  const [p1, p2, p3, p4, p5] = photos;

  return (
    <section id="gallery" className="card-section bg-gradient-to-b from-[#FFF8EE] to-[#FCEBDD]">
      <SectionTitle eyebrow="Moments we treasure">{gallery.heading}</SectionTitle>

      <div className="mx-auto mt-6 flex aspect-[340/230] max-w-[360px] gap-1.5">
        {p1 && <Tile photo={p1} onOpen={() => show(0)} className="flex-[1.75]" />}
        <div className="flex flex-1 flex-col gap-1.5">
          {p2 && <Tile photo={p2} onOpen={() => show(1)} delay={0.1} className="flex-[2]" />}
          {p3 && <Tile photo={p3} onOpen={() => show(2)} delay={0.18} className="flex-1" />}
        </div>
        <div className="flex flex-[0.92] flex-col gap-1.5">
          {p4 && <Tile photo={p4} onOpen={() => show(3)} delay={0.14} className="flex-1" />}
          {p5 && <Tile photo={p5} onOpen={() => show(4)} delay={0.22} className="flex-1" />}
        </div>
      </div>

      <Reveal className="mt-6 text-center">
        <button type="button" className="btn-outline" onClick={(e) => show(0, e.currentTarget)}>
          <Images className="h-4 w-4 text-gold" aria-hidden /> {gallery.moreLabel}
        </button>
      </Reveal>

      <Lightbox photos={photos} index={open} onClose={close} onChange={setOpen} />
    </section>
  );
}
