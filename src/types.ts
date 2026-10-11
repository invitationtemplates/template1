/** A photograph. `src` is a local asset; `cloudinaryId` (optional) is used instead when Cloudinary is configured. */
export interface Photo {
  src: string;
  alt: string;
  cloudinaryId?: string;
}

export interface TimelineItem {
  icon: "heart" | "coffee" | "ring";
  title: string;
  text: string;
}

export interface ScheduleItem {
  icon: "arrival" | "ceremony" | "photography" | "reception" | "dinner" | "dance";
  time: string;
  title: string;
  subtitle: string;
}

export interface InvitationConfig {
  couple: { first: string; second: string; hashtag: string };
  /** ISO date-time with timezone offset. Weekday, day number, month and countdown are all derived from this. */
  event: { start: string; end: string; timezone: string };
  bismillah: string;
  hero: {
    together: string;
    invite: string;
    receptionOf: string;
    perks: [string, string];
  };
  venue: { name: string; address: string; image: Photo; mapsQuery: string };
  story: { heading: string; photo: Photo; items: TimelineItem[] };
  schedule: { heading: string; items: ScheduleItem[] };
  gallery: { heading: string; photos: Photo[]; moreLabel: string };
  rsvp: { heading: string; whatsappNumber: string };
  footer: { thanks: string; instagram: string; facebook: string };
  heroPhoto: Photo;
  /** Opening cover text. */
  cover: { invited: string; tap: string; dear: string };
  /** Background music file in /public (leave empty to hide the music button). */
  musicSrc: string;
  /** Start the music when the guest taps the cover (the tap counts as the permission browsers require). */
  musicOnOpen: boolean;
  nav: { label: string; href: string }[];
}
