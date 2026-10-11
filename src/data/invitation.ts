import type { InvitationConfig } from "../types";
import couple from "../assets/photos/couple.webp";
import story from "../assets/photos/story.webp";
import venue from "../assets/photos/venue.webp";
import g1 from "../assets/photos/gallery-1.webp";
import g2 from "../assets/photos/gallery-2.webp";
import g3 from "../assets/photos/gallery-3.webp";
import g4 from "../assets/photos/gallery-4.webp";
import g5 from "../assets/photos/gallery-5.webp";

/**
 * ============================================================================
 *  EDIT THIS FILE to reuse the design for another couple.
 *  Everything below is SAMPLE CONTENT taken from the reference mock-up; the
 *  names, venue, times and phone number are placeholders, not real details.
 *  Photos are low-resolution samples: replace them in src/assets/photos
 *  (or give them a `cloudinaryId` and set VITE_CLOUDINARY_CLOUD in .env).
 * ============================================================================
 */
export const invitation: InvitationConfig = {
  couple: { first: "Ayesha", second: "Hamza", hashtag: "#AyeshaAndHamza" },

  // SAMPLE DATE. The weekday ("Sunday") is calculated from this date, so it can never disagree with it.
  event: {
    start: "2027-04-18T19:00:00+05:00",
    end: "2027-04-18T23:00:00+05:00",
    timezone: "Asia/Karachi",
  },

  bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",

  hero: {
    together: "Together with their families",
    invite: "Joyfully invite you to celebrate their wedding",
    receptionOf: "Reception of",
    perks: ["Your presence is the best gift for us", "No boxes please"],
  },

  heroPhoto: { src: couple, alt: "Ayesha and Hamza standing close together in their wedding outfits" },

  venue: {
    name: "Royal Palace",
    address: "Canal Road, Lahore",
    image: { src: venue, alt: "The Royal Palace venue with its white colonnaded entrance and gardens" },
    mapsQuery: "Royal Palace, Canal Road, Lahore",
  },

  story: {
    heading: "The Love Story",
    photo: { src: story, alt: "The couple walking together through a garden" },
    items: [
      { icon: "heart", title: "First Meeting", text: "We met at a mutual friend's wedding and instantly felt a connection." },
      { icon: "coffee", title: "First Date", text: "Our first date was a simple coffee that turned into hours of laughter." },
      { icon: "ring", title: "The Proposal", text: "He proposed in the most beautiful way, surrounded by the people we love." },
    ],
  },

  schedule: {
    heading: "Wedding Day Schedule",
    items: [
      { icon: "arrival", time: "03:00 PM", title: "Guest Arrival", subtitle: "Welcome & refreshments" },
      { icon: "ceremony", time: "04:00 PM", title: "Wedding Ceremony", subtitle: "Vows & blessings" },
      { icon: "photography", time: "05:30 PM", title: "Photography", subtitle: "Family & couple photos" },
      { icon: "reception", time: "07:00 PM", title: "Reception", subtitle: "Grand entry & celebration" },
      { icon: "dinner", time: "08:00 PM", title: "Dinner", subtitle: "Enjoy the feast" },
      { icon: "dance", time: "10:00 PM", title: "Dance & Celebration", subtitle: "Let's make memories" },
    ],
  },

  gallery: {
    heading: "Our Gallery",
    moreLabel: "View More Photos",
    photos: [
      { src: g1, alt: "The couple in a tender moment in the garden" },
      { src: g2, alt: "The bride in a gold embroidered outfit" },
      { src: g3, alt: "The bride smiling" },
      { src: g4, alt: "A bouquet of blush roses" },
      { src: g5, alt: "The couple standing together outdoors" },
    ],
  },

  rsvp: {
    heading: "RSVP",
    // Digits only, with country code. Used to send RSVP replies through WhatsApp when no endpoint is configured.
    // SAMPLE: replace with the family's real number.
    whatsappNumber: "923000000000",
  },

  footer: {
    thanks: "Thank you for being part of our special day",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  cover: { invited: "You are invited", tap: "Tap to open", dear: "Dear" },

  // Leave empty to hide the music button. Example: "/audio/wedding.mp3" (file placed in /public/audio).
  musicSrc: "",
  musicOnOpen: true,

  nav: [
    { label: "Our Story", href: "#our-story" },
    { label: "The Wedding", href: "#the-wedding" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
  ],
};
