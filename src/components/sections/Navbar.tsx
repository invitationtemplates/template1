import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Share2, X } from "lucide-react";
import { LeafLogo } from "../ui/Icons";
import type { InvitationConfig } from "../../types";

/** Sticky top bar: leaf logo, four anchor links separated by gold dots, and a hamburger drawer. */
export default function Navbar({ nav, title }: { nav: InvitationConfig["nav"]; title: string }) {
  const [open, setOpen] = useState(false);
  const [shared, setShared] = useState(false);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const share = async () => {
    const data = { title, text: title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* the guest cancelled the share sheet */
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gold-soft/50 bg-cream/90 backdrop-blur-md">
      <nav aria-label="Main" className="flex h-10 items-center justify-between px-3.5">
        <a href="#home" aria-label="Back to top" className="text-gold">
          <LeafLogo className="h-5 w-5" />
        </a>

        <ul className="flex items-center gap-2 font-body text-[10.5px] font-semibold text-cocoa">
          {nav.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-gold" />}
              <a href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-cocoa"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold-soft/50 bg-cream"
          >
            <ul className="space-y-1 px-5 py-3 font-body text-[15px] font-semibold">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block py-1.5">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={share} className="flex items-center gap-2 py-1.5 text-gold-deep">
                  <Share2 className="h-4 w-4" /> {shared ? "Link copied" : "Share this invitation"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
