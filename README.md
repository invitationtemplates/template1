# Wedding Invitation, blush & gold (invitation4)

Mobile-first wedding invitation website recreated from a reference screenshot: cream paper, blush florals, gold lanterns, an arched couple portrait and a "Reception of" card.

React 18 · Vite · TypeScript · Tailwind CSS · Motion for React (`motion`) · Lucide icons. No backend required.

> **All names, dates, venue and phone numbers are SAMPLE content** (Ayesha & Hamza, Royal Palace, Lahore). Replace them in `src/data/invitation.ts`.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). On Vercel the framework preset is **Vite**; nothing else to configure.

## Opening cover ("Tap to open")

Guests first see a full-screen cover with the couple's names, date and a gold seal. Tapping it (or pressing Enter) bursts petals from the seal, shrinks the cover into it, and reveals the invitation, whose entrance animations start at that moment. Page scrolling is locked while the cover is shown. Reduced-motion guests get a simple fade.

- **Personalised links:** `https://your-site/?guest=Aunt%20Sara` adds "Dear Aunt Sara" to the cover.
- **Music:** if `musicSrc` is set and `musicOnOpen` is `true`, the music starts on the cover tap (the tap is the permission browsers require). The floating button still lets guests pause it.
- **Text:** edit `cover` in `src/data/invitation.ts`.

## Reuse for another couple

Edit **only** `src/data/invitation.ts`:

| Field | What it controls |
| --- | --- |
| `couple` | Names and hashtag (hero, footer, page title) |
| `event.start` / `event.end` / `event.timezone` | Weekday, day, month, year, times, countdown and map text are all **calculated** from these, so they can never disagree |
| `venue` | Name, address, photo, Google Maps search text |
| `story`, `schedule`, `gallery` | Timeline, six schedule items, gallery photos |
| `rsvp.whatsappNumber` | Where RSVP replies go when no endpoint is set (digits, with country code) |
| `musicSrc` / `musicOnOpen` | Background music file in `public/` (empty hides the button); whether the cover tap starts it |
| `cover` | Text on the opening cover |
| `footer`, `nav` | Social links and navigation |

Then replace the photos in `src/assets/photos/` (or use Cloudinary below) and set `VITE_SITE_URL` in `.env`.

## Structure

```
src/
├─ App.tsx                    page composition
├─ data/invitation.ts         ← all content
├─ types.ts                   config types
├─ components/
│  ├─ sections/               Navbar, Hero, SaveTheDate, LoveStory, Schedule,
│  │                          Gallery (+ lightbox), Rsvp, Venue, Footer
│  └─ ui/                     Reveal, SectionTitle, Ornament, Decor (florals, lanterns,
│                             petals, mandala), Icons, MusicPlayer
├─ hooks/useCountdown.ts      live countdown (pauses when the tab is hidden)
├─ lib/                       dates.ts, image.ts (Cloudinary), rsvp.ts (integration point)
├─ assets/                    photos/ and floral artwork
└─ styles/index.css
```

## Assets (placeholders to replace)

| File | Replace with | Size |
| --- | --- | --- |
| `src/assets/photos/couple.webp` | Hero portrait (shown inside the arch) | 900×1100 |
| `src/assets/photos/story.webp` | Love story photo | 800×1030 |
| `src/assets/photos/gallery-1…5.webp` | Gallery; 1 is the large tile | 1200 px on the long edge |
| `src/assets/photos/venue.webp` | Venue photo | 1200×530 |
| `src/assets/floral-corner.png` | Rose cluster, top-left corner (mirrored in code for the right) | 840×880, transparent |
| `src/assets/floral-side.png` | Vertical garland for the RSVP edges | 380×1120, transparent |
| `src/assets/floral-footer.png` | Footer corner cluster | 920×1040, transparent |
| `src/assets/floral-sprig.png`, `lantern.png`, `bulb.png` | Small decorations | transparent |
| `public/og-image.jpg` | Link preview | 1200×630 |

The sample photos were cut from the low-resolution reference screenshot, so they look soft. The florals and lanterns are generated placeholders.

## RSVP: how replies are handled

`src/lib/rsvp.ts` is the integration point and never pretends to save data:

1. `VITE_RSVP_ENDPOINT` set → reply is POSTed as JSON (Google Apps Script web app, Supabase edge function, your API).
2. Otherwise, with a WhatsApp number configured → a pre-filled WhatsApp message to the family opens, and the success text says exactly that.
3. Otherwise nothing is sent, and the page says so.

Google Sheets in five minutes: create a sheet with headers `submittedAt, name, phone, attending, guests, dietary, message`, add this Apps Script, deploy it as a web app (access: anyone), and put the URL in `VITE_RSVP_ENDPOINT`:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([d.submittedAt, d.name, d.phone, d.attending ? "Yes" : "No", d.guests, d.dietary, d.message]);
  return ContentService.createTextOutput("ok");
}
```

## Cloudinary (optional)

Upload the photos, then give each one a `cloudinaryId` in `invitation.ts` and set `VITE_CLOUDINARY_CLOUD` in `.env`. Photos are then served as `f_auto,q_auto,w_<size>` (small WebP/AVIF on phones). Without it, the bundled files are used.

## Animation and accessibility

- Motion for React handles entrances, scroll reveals, the lightbox, menu and countdown; floral sway, lantern swing, petals and shimmer are CSS keyframes (transform/opacity only). GSAP was not needed.
- `prefers-reduced-motion` is respected (`MotionConfig reducedMotion="user"` plus a CSS override).
- Photos below the fold are lazy-loaded; images carry width/height to avoid layout shift.
- Music never autoplays: a floating button (only shown when `musicSrc` is set) toggles it.
- Menu, gallery and form are keyboard-usable (Esc closes both overlays; arrows move through photos).
