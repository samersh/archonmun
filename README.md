# archonMUN 2026 · Rewrite the System

Static site for archonMUN (Archon Model United Nations), 8 to 10 October 2026
in Ramallah, hosted at Bank Al Quds. Live at https://arcmun.online (GitHub Pages).

No build step, no dependencies. Three files do the work: `index.html`,
`css/style.css`, `js/main.js`.

## Run it locally

```
python3 -m http.server 4321
```

Then open http://localhost:4321

## Deploy

Upload the folder as is to Netlify, Vercel, GitHub Pages, or any static host.
Nothing needs compiling.

---

## Before you go live

Conference facts now follow the client guide (`archonMUN-website-guide.docx`,
20 Sep 2026). Everything below is what that guide still lists as outstanding.

All dates and venue names live in one place: the `CONFIG` block at the top of
`js/main.js`.

| Field | Current value | Status |
|---|---|---|
| `start` | `2026-10-08T09:00:00+03:00` | Confirmed. Drives the countdown. |
| `dates` | `8 to 10 October 2026` | Confirmed. |
| `deadline` | `26 September 2026` | Confirmed. |
| `city` / `venue` | Ramallah / Bank Al Quds, Al Masyoun | Confirmed. |
| `register` | Google Form | Confirmed. Delegate application; all six Register buttons. |
| `chair` | Google Form | Confirmed. Separate chair application. |
| `email` | `archonmun@gmail.com` | Confirmed. |
| `social` | Instagram `@archonmun` | Confirmed. A platform with no URL is dropped from the footer rather than left dead, so removing one is a one-line edit. |

Still to supply, per the guide's own checklist:

- **Social event venue**, currently "Venue to be announced".
- **Exact addresses and map links** for all four locations. Each reads
  "To be confirmed".
- **Gold and Silver sponsor logos.** Slots read "Available".
- **The Greek-key notebook border graphic.** The site uses a drawn meander
  in the meantime; swap `.rule-key` in `css/style.css` when the file arrives.

## Bank Al Quds

The guide requires the bank's mark on every page, separate from the ARCMUN
seal. It appears twice: in the footer under "Umbrella organisation and venue
host", and as a set-apart acknowledgement block below the Gold and Silver
tiers in the Partners section, per the guide's instruction that their role is
not a paid sponsorship.

`assets/quds-bank.png` was taken from qudsbank.ps at 200x73. Two things worth
knowing:

1. **It is low resolution.** 200px wide is about 1.3x at the footer's display
   size. Ask Bank Al Quds for a vector or a 2x PNG.
2. **The wordmark is dark grey (#585655), the emblem gold.** On the navy
   footer the text would disappear, so the logo sits on its own cream tile
   rather than being recoloured. Recolouring another organisation's logo is a
   brand violation; the tile is the correct fix.

Confirm with Bank Al Quds that this is the approved asset before launch.

## The logo

`assets/logo.jpeg` is your original artwork, untouched. Two files are derived
from it and are what the site actually serves:

- `assets/logo.png` — the cream ground outside the seal flood filled to
  transparent, resized to 512px and palette compressed to 83KB. This is what
  appears in the nav, the hero, and the footer. Because the ground is cut at
  the outer ring, the mark reads as a medallion on the navy sections instead
  of a cream square.
- `assets/favicon.png` — 180px, opaque, used for the browser tab and as the
  Apple touch icon.

Regenerate either one from the original with Pillow if you ever replace the
artwork. `main.js` looks for `logo.png`, then `logo.svg`, `logo.jpg`,
`logo.jpeg`, `logo.webp`, in that order, and adds `has-logo` to `<html>` when
one resolves.

Note the file was originally `Logo.jpeg` with a capital L. It was renamed to
lowercase: macOS does not care, but Netlify, Vercel, and GitHub Pages run on
case-sensitive filesystems and would have served a 404.

If none of those files resolve, the site falls back to a crest drawn in SVG
and inlined in `index.html` as a `<symbol>`. It is a close reading of your
mark: meander ring, laurel branches, amphora on an Ionic column, and the
`ARCHON MODEL UNITED NATIONS` / `ARCMUN` text ring. It exists so a moved or
missing file can never leave a broken image on the page.

## Board and team

All 21 members are in, with names and roles from the supplied photo
directory. `js/team-data.js` is the single roster, loaded by both pages:

- **Home page** shows the first `TEAM_FEATURED` (8), then a "See all the
  team" link through to the roster.
- **`team.html`** shows everyone.

The array is ordered by seniority, so the eight at the top are the eight the
home page surfaces. Reorder there and both pages follow.

**One editorial call to check.** There are three Deputy Heads of Conference,
and the featured eight ends after the first of them, so Amira Nusseibeh
appears on the home page while Mariam Abu Sneineh and Rasheed Khatib do not.
Eight fills the four-column grid as two clean rows, which is why it sits
there. If you would rather not split that tier, set `TEAM_FEATURED` to 7
(ending after the Heads of Conference) or 10 (including all three deputies).

Cards are flat: portrait, name, role. No flip, no quote.

### The portraits

Source photos are the ones supplied in `photo_people_directory/`. They were
not simply resized. The originals ranged from studio headshots to full-body
holiday snaps, which would have produced a very uneven grid, so each was
cropped to a common framing: **the face a quarter of the card wide and a
third of the way down**, then capped at a 1000px long edge. 21 portraits,
1.7 MB total.

Face positions came from OpenCV's Haar cascades, which read 19 of the 21.
Five carry hand-measured positions instead, recorded in
`scratchpad/crop.py`: two candids where no face was detected (Mohammad
Beidoosi reading at a table, Rasheed Khatib at a podium) and three where the
detector locked onto the wrong thing entirely. It chose a **cloud** over
Khalid Mamlouk's face and a **railing** over Lara Frettekh's, because it
takes the largest candidate and those photos are wide landscapes with a
small subject. Worth knowing if you ever re-run that script on new photos:
check the result rather than trusting it.

Files are named by slug (`omar-shawar.jpg`), so replacing one person's
portrait means overwriting one file. If a new photo frames badly, add
`focus: '50% 20%'` to that entry rather than re-cropping.

## Content

## Content

Committees, topics, and the FAQ are data, not markup. Edit the
`COMMITTEES`, `TEAM`, and `FAQ` arrays in `js/main.js` and the page rebuilds
itself. Each topic carries an `i` key naming its motif icon, per the guide's
suggested visual per topic; the nine symbols are in the icon sprite at the top
of `index.html`. Committee
`level` must be `beginner`, `intermediate`, or `advanced`, which is what the
filter chips read.

## Partners

Gold and Silver are the only two tiers, with Gold placed above and given
larger tiles and a gold-bordered frame, as the guide asks. Empty slots read
"Available". To add a partner, replace a `.slot` div in `index.html`:

```html
<div class="slot"><img src="assets/partners/name.svg" alt="Partner name"></div>
```

Delete any slots you do not need. The grid reflows on its own.

## Design notes

Palette is the guide's four, taken from the seal: Ink Navy `#1B2A4A`,
Antique Gold `#C9A227`, Olive Green `#4B6B3A`, Ivory `#F3ECDD`.

Type stack:

| Role | Face | Where |
|---|---|---|
| Inscriptional | **Cinzel** | Hero headline, section kickers, buttons, small caps labels |
| Reading serif | **Newsreader** | Section titles, the vision quote, prices, dossier values |
| Interface sans | **Archivo** | Body copy, lists, committee blurbs |
| Data | **IBM Plex Mono** | Field labels, dates, coordinates |

Cinzel is the guide's first suggestion for headings and is modelled on Roman
inscriptional capitals, which is why the hero reads like something carved
rather than typeset. The guide offered EB Garamond or Lora for body text;
Newsreader and Archivo do that job here and were chosen for legibility at
small sizes after a readability pass.

The hero is a single centred column over a drawn Ramallah. The panorama
lives in `assets/ramallah.svg` and is inlined into `index.html`: the Al-Manara
monument with its lions at centre, a church and bell tower to the left, a
mosque and minaret and the Muqata'a tower to the right, modern stone blocks
between, street lamps along the front, and olive trees on the hills beyond. It is line art in a single gold, held at
42% opacity and masked so it dissolves upward instead of ending on a hard
edge. A scrim sits between the city and the copy so the lower text never
fights the drawing.

The crest floats clear above the domes with a soft warm halo behind it. There
is no background pattern in the hero and no bordered panel; the conference
details run as a light ribbon of hairline separated pairs, with the countdown
as a single thin line beneath.

Everything in the hero arrives on a slow settle rather than a snap: opacity,
a short lift, and a blur resolving together over 1.5s on
`cubic-bezier(.16,.84,.44,1)`, staggered from the crest down to the countdown.

The headline cycles its last word (system, table, order, rules, map), striking
out the old one before the new lands. That is the conference theme made
literal. It holds still for anyone with reduced motion turned on.

Accessibility: skip link, keyboard-operable accordions with correct
`aria-expanded`, visible focus rings, honours `prefers-reduced-motion`, and the
page content stays visible if JavaScript fails. Small caps labels are tracked
at 0.1 to 0.2em rather than the 0.32em an earlier draft used, which was the
main thing making them hard to read.

## Deployment

Live from GitHub Pages, `main` branch, repo root. Pushing to `main` redeploys;
a build takes about a minute.

Currently served at **https://samersh.github.io/archonmun/**.

### Moving to arcmun.online

The domain was registered but its DNS was not yet resolving at deploy time,
and a custom domain on Pages redirects the github.io address to it, so
setting it early would have taken the site offline. To switch once DNS is up:

1. At the registrar for `arcmun.online`, add four A records on the apex:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   and, for IPv6, four AAAA records: `2606:50c0:8000::153`,
   `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
2. Add a CNAME record for `www` pointing at `samersh.github.io`.
3. Once `dig +short arcmun.online` returns those IPs, add a file named
   `CNAME` at the repo root containing `arcmun.online`, and push.
4. In the repo's Settings, Pages, tick "Enforce HTTPS" after the certificate
   is issued, which takes a few minutes.
5. Change `og:url` and `og:image` in `index.html` back to the arcmun.online
   origin, and `CONFIG.domain` in `js/main.js` is already set to it.
