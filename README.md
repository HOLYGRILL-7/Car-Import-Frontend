# Extra Motors: car import & sales website

**🔗 Live site:** [extra-motors.vercel.app](https://extra-motors.vercel.app)

<img width="100%" alt="Extra Motors homepage" src="https://github.com/user-attachments/assets/f707880f-d433-459a-939d-b3883a7e87b0" />

A single-page site for a family-run used car import and sales business in
Achimota, Accra, Ghana. Visitors browse and filter cars, save favourites,
read reviews and reach the dealer by phone or WhatsApp. The admin manages the
listings, testimonials and users from a private panel.

**Stack:** React 19, Vite 7, Tailwind CSS 4, React Router 7, and Firebase
(Authentication, Firestore, Storage). There is no custom backend. Hosted on
Vercel, which builds and deploys every push to `master`.

## Quick start

Requirements: Node.js 20.19+ (or 22.12+) and [Yarn 1](https://classic.yarnpkg.com/).

```bash
yarn install
cp .env.example .env      # then fill in the values (see "Environment variables")
yarn dev                  # http://localhost:5173
```

| Script          | What it does                       |
| --------------- | ---------------------------------- |
| `yarn dev`      | Vite dev server with hot reload    |
| `yarn build`    | Production build into `dist/`      |
| `yarn preview`  | Serve the production build locally |
| `yarn lint`     | ESLint (must pass with no errors)  |
| `yarn prettier` | Format everything with Prettier    |

## Environment variables

All variables live in `.env` (gitignored; copy `.env.example`). Vite bakes the
`VITE_*` values into the browser bundle at build time, so **none of them can be
secret**. They identify the Firebase project; access is enforced by the
Firestore and Storage rules, not by hiding these.

| Variable                            | Required | Purpose                                                        |
| ----------------------------------- | -------- | -------------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | yes      | Firebase web app config (console > Project settings > General) |
| `VITE_FIREBASE_AUTH_DOMAIN`         | yes      | "                                                              |
| `VITE_FIREBASE_PROJECT_ID`          | yes      | "                                                              |
| `VITE_FIREBASE_STORAGE_BUCKET`      | yes      | "                                                              |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | yes      | "                                                              |
| `VITE_FIREBASE_APP_ID`              | yes      | "                                                              |
| `VITE_ADMIN_EMAIL`                  | yes      | The one admin account's email (lowercase); shows the admin UI  |
| `VITE_USE_EMULATORS`                | no       | `true` connects to the local Firebase emulators (dev only)     |

On Vercel, set the same variables in the project's settings. Firebase Admin
credentials (`serviceAccountKey.json`) are **never** needed by the site itself,
only by some of the scripts below, and must never be committed (it is
gitignored).

## Adding a car

1. Log in at `/login` with the admin account, then open **Admin > Manage Cars**.
2. Fill in name, type (used/new), year, price **in Ghana cedis** (shown on the
   site as "GH₵ 185,000"), mileage and description. The other details are optional.
3. Pick **1 to 10 photos**. Phone photos are fine as they are (up to 25 MB
   each): they're shrunk in the browser before upload (see "Photos"). The first
   photo is the cover; use "Set as cover" to change it.
4. Click **Add Car**. It's live straight away; no redeploy needed.
5. Update the sitemap so Google finds the new car: run
   `node --env-file=.env generate-sitemap.js`, then commit `public/sitemap.xml`
   and push. Do the same after selling or deleting cars.

If a Used/New Cars filter shows an error the first time it's used, open the
browser console: Firestore's message contains a one-click link to create the
missing index. Follow it and wait a few minutes for the index to build.

## Photos

- Stored in Firebase Storage under `cars/{carId}/`; each car document keeps
  their download URLs in `imageUrls` (first = cover).
- The admin form compresses every photo in the browser before upload
  (`src/utils/compressImage.js`): longest side at most 1600 px, WebP at quality
  0.8, stepping down toward 300 KB. Safari can't encode WebP, so there it falls
  back to JPEG. Photos are processed one at a time to spare phone memory.
- Every upload is sent with `Cache-Control: public, max-age=31536000`, so
  browsers keep photos for a year (each upload has a unique path and is never
  changed in place).
- The Storage rules only accept images under 5 MB from the admin; compressed
  photos are far below that.

## SEO

- **Titles and descriptions:** every page renders `<PageMeta>`
  (`src/components/PageMeta.jsx`), which uses React 19's built-in `<title>` and
  `<meta>` support. Car pages get "{Year} {Name} for sale in Accra | Extra
  Motors" with price, mileage and fuel type in the description. Login,
  register, password reset, saved cars, admin, the 404 page and deleted cars
  are marked `noindex`. `index.html` deliberately has no static `<title>` or
  description, since it would override the per-page ones.
- **Link previews:** `index.html` has static Open Graph tags and a 1200×630
  `public/og-image.png`. WhatsApp and Facebook don't run JavaScript, so every
  shared link (including car pages) shows this general card.
- **Sitemap:** `public/sitemap.xml` lists the fixed public pages plus one URL
  per available car. Regenerate it with `generate-sitemap.js` (see "Scripts")
  whenever the stock changes. `public/robots.txt` points crawlers to it.

## Analytics

Google Analytics 4 (tag in `index.html`, measurement ID `G-3NCWQ8QBWM`, public
by design). Besides page views, every Call and WhatsApp button sends a
`contact_click` event (`src/utils/analytics.js`):

| Parameter  | Value                                          |
| ---------- | ---------------------------------------------- |
| `method`   | `call` or `whatsapp`                           |
| `car_name` | the car's name, on the car page's buttons only |

Tracked buttons: car page (Call Seller, WhatsApp), Contact page (Call now,
Chat on WhatsApp), each Services card's "Learn More" (WhatsApp), and the
footer phone number.

In GA4: **Reports > Realtime** shows events within seconds; **Reports >
Engagement > Events** after 24–48 hours. To break the events down by method or
car, register `method` and `car_name` once as event-scoped custom dimensions
(**Admin > Data display > Custom definitions**), then use **Explore > Free
form**. `contact_click` can be marked as a key event under **Admin > Data
display > Events**.

## Scripts

Standalone Node scripts in the project root, not part of the site.

| Command                                    | What it does                                                                                                                                                                        | Needs `serviceAccountKey.json` |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `node --env-file=.env generate-sitemap.js` | Rebuilds `public/sitemap.xml` from the cars marked available (run after stock changes, then commit and push)                                                                        | no (cars are public)           |
| `node --env-file=.env verify-admin.js`     | Marks the admin account's email as verified                                                                                                                                         | yes                            |
| `node --env-file=.env set-photo-cache.js`  | One-off: sets the one-year `Cache-Control` on photos uploaded before it was automatic. Safe to re-run; add `--dry-run` to preview                                                   | yes                            |
| `node seed.js`                             | Seeds the `cars` collection from `cars.json` (safe to re-run)                                                                                                                       | yes                            |
| `node sync-users.js`                       | Copies every Auth account's email and sign-up date into the `users` collection that the admin's Manage Users page reads (accounts are also recorded automatically on first sign-in) | yes                            |

The service account key comes from Firebase console > Project settings >
Service accounts > Generate new private key, saved as **`serviceAccountKey.json`**
in the project root (gitignored).

## One-time Firebase setup

1. Create a Firebase project and a web app; put its config in `.env`.
2. Enable **Authentication > Email/Password**, **Firestore** and **Storage**.
3. Create the admin user in Authentication > Users, using the email in
   `VITE_ADMIN_EMAIL`.
4. Put that same email (lowercase) in `firestore.rules` and `storage.rules` in
   place of `REPLACE_WITH_ADMIN_EMAIL`, then publish both in the Firebase
   console (Firestore > Rules and Storage > Rules). Keep the files in the repo
   identical to what's published.
5. Mark the admin's email as verified. The rules require it, and accounts made
   in the console start unverified: `node --env-file=.env verify-admin.js`.

## Running against the Firebase emulators (optional)

Lets you develop without touching the real project.

1. Install the [Firebase CLI](https://firebase.google.com/docs/cli) (`npm i -g firebase-tools`) and **JDK 21 or newer** (the Firestore emulator needs Java).
2. Set `VITE_USE_EMULATORS=true` in `.env`. Any placeholder Firebase values work.
3. `firebase emulators:start --only auth,firestore,storage` (ports are in `firebase.json`: Auth 9099, Firestore 8080, Storage 9199).
4. `yarn dev`. To try the admin panel, create the admin account in the emulator
   and use a local copy of the rules with your admin email filled in.

## Project layout

```
src/
  App.jsx, main.jsx      routes (every page but Home is lazy-loaded); app entry
  layout/                public site layout (navbar + footer) and the admin layout
  pages/
    PublicPages/         Home, Used/New Cars, Car details, Services, Reviews, FAQ, Contact, 404
    AboutPages/          About Us, Our Team, Press & Media
    AdminPages/          Dashboard, Manage Cars, Testimonials, Manage Users
    UserPages/           Saved Cars
  components/            UI pieces, grouped by feature (PageMeta, PageLoader, ...)
  hooks/                 data-fetching hooks (cars, testimonials, ...)
  firebase/              Firebase config, Firestore access; storage.js (admin only)
  context/               Auth and wishlist state
  data/                  static page content (services, FAQ, team, footer, ...)
  constants/contact.js   phone, WhatsApp number and service area (edit here)
  utils/                 helpers (filters, price formatting, photo compression, analytics)
public/                  robots.txt, sitemap.xml, og-image.png, icons
firestore.rules          Firestore security rules (publish after editing)
storage.rules            Storage security rules
```

Where the content lives, if you need to change wording or details:

- **Phone, WhatsApp number, service area:** `src/constants/contact.js`
- **Footer email and links:** `src/data/footerData.js`
- **Services cards and their WhatsApp messages:** `src/data/carsData.js`
- **FAQ answers:** `src/data/faqData.js`
- **About, Team and Press text:** `src/data/aboutData.js`, `src/data/teamData.js`
- **Page titles and descriptions:** the `<PageMeta>` line near the top of each page
- **Name shown for the admin:** `src/utils/admin.js`

## How the data is stored

- `cars`: listings. Public read; only the admin can write. `price` is a number
  in Ghana cedis. Photos are in Storage under `cars/`.
- `testimonials`: customer quotes shown on the Reviews page. Public read; admin write.
- `users/{uid}`: email and sign-up date, written once per account on first sign-in. Readable by that user and the admin.
- `users/{uid}/wishlist/{carId}`: a user's saved cars. Private to that user; the admin's dashboard counts them.

## Deployment notes

- Vercel builds `master` with `yarn build` and serves `dist/`. `vercel.json`
  rewrites every path to `index.html`, so refreshing a deep link such as
  `/usedCars` works.
- Pages are split into separate chunks, so visitors download the admin,
  login and wishlist code only if they open those pages.
- Set the environment variables above in Vercel, and publish `firestore.rules`
  and `storage.rules` to the same Firebase project.
- Consider restricting the Firebase web API key to your site's domain in the
  Google Cloud console (APIs & Services > Credentials).

## Kept on purpose

- The commented-out blocks in `src/data/teamData.js`, `Press.jsx` and
  `Team.jsx`, so press items and the "join our team" section are easy to
  reinstate.
