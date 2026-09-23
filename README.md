# Extra Motors: car import & sales website

A single-page site for a family-run used car import and sales business in
Achimota, Accra, Ghana. Visitors browse and filter cars, save favourites,
read reviews and reach the dealer by phone or WhatsApp. The admin manages the
listings, testimonials and users from a private panel.

**Stack:** React 19, Vite 7, Tailwind CSS 4, React Router 7, and Firebase
(Authentication, Firestore, Storage). There is no custom backend.

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

On a host such as Vercel, set the same variables in the project's settings
before building. Firebase Admin credentials (`serviceAccountKey.json`) are
**never** needed by the site itself, only by the maintenance scripts below, and
must never be committed (it is gitignored).

## One-time Firebase setup

1. Create a Firebase project and a web app; put its config in `.env`.
2. Enable **Authentication > Email/Password**, **Firestore** and **Storage**.
3. Create the admin user in Authentication > Users, using the email in
   `VITE_ADMIN_EMAIL`.
4. In `firestore.rules` and `storage.rules`, replace `REPLACE_WITH_ADMIN_EMAIL`
   with that same email (lowercase), then publish both (Firebase console >
   Rules, or `firebase deploy --only firestore:rules,storage`).
5. Mark the admin's email as verified. The rules require it, and accounts made
   in the console start unverified: `node --env-file=.env verify-admin.js`
   (needs `serviceAccountKey.json`, see below).
6. Firestore composite indexes: the Used / New Cars filters run server-side
   queries. The first time a filter combination has no index, Firestore returns
   an error whose message contains a one-click link to create it (it is also
   logged to the browser console). Follow the link and wait for the index to build.

## Maintenance scripts (Node, use the Admin SDK)

These are standalone scripts in the project root, not part of the site. Each
needs a service account key: Firebase console > Project settings > Service
accounts > Generate new private key, saved as **`serviceAccountKey.json`** in the
project root (gitignored).

| Command                                | What it does                                                                                                                                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node --env-file=.env verify-admin.js` | Marks the admin account's email as verified                                                                                                                                                    |
| `node seed.js`                         | Seeds the `cars` collection from `cars.json` (safe to re-run)                                                                                                                                  |
| `node sync-users.js`                   | Copies every Auth account's email and sign-up date into the `users` collection that the admin's Manage Users page reads (accounts are also recorded automatically the first time they sign in) |

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
  App.jsx, main.jsx      routes; app entry (error boundary, router, providers)
  layout/                public site layout (navbar + footer) and the admin layout
  pages/
    PublicPages/         Home, Used/New Cars, Car details, Services, Reviews, FAQ, Contact, 404
    AboutPages/          About Us, Our Team, Press & Media
    AdminPages/          Dashboard, Manage Cars, Testimonials, Manage Users
    UserPages/           Saved Cars (the other files here are unlinked stubs)
  components/            UI pieces, grouped by feature
  hooks/                 data-fetching hooks (cars, testimonials, ...)
  firebase/              Firebase config and Firestore/Storage access
  context/               Auth and wishlist state
  data/                  static page content (services, FAQ, team, footer, ...)
  constants/contact.js   phone, WhatsApp number and service area (edit here)
  utils/                 pure helpers (filters, formatting, dashboard stats)
firestore.rules          Firestore security rules (publish after editing)
storage.rules            Storage security rules
```

Where the content lives, if you need to change wording or details:

- **Phone, WhatsApp number, service area:** `src/constants/contact.js`
- **Footer email and links:** `src/data/footerData.js`
- **Services cards and their WhatsApp messages:** `src/data/carsData.js`
- **FAQ answers:** `src/data/faqData.js`
- **About, Team and Press text:** `src/data/aboutData.js`, `src/data/teamData.js`
- **Name shown for the admin:** `src/utils/admin.js`

## How the data is stored

- `cars`: listings. Public read; only the admin can write. Photos are in Storage under `cars/`.
- `testimonials`: customer quotes shown on the Reviews page. Public read; admin write.
- `users/{uid}`: email and sign-up date, written once per account on first sign-in. Readable by that user and the admin.
- `users/{uid}/wishlist/{carId}`: a user's saved cars. Private to that user; the admin's dashboard counts them.

## Deployment notes

- `yarn build` produces a static site in `dist/` (any static host works).
- The site uses client-side routing, so the host must serve `index.html` for
  unknown paths (a "rewrite all to `/index.html`" rule), otherwise refreshing a
  deep link such as `/usedCars` returns a 404.
- Set the environment variables above on the host and publish
  `firestore.rules` and `storage.rules` to the same Firebase project.
- `index.html` contains a Google Analytics tag (measurement ID `G-…`). That ID is
  public by design.
- Consider restricting the Firebase web API key to your site's domain in the
  Google Cloud console (APIs & Services > Credentials).

## Known placeholders

- `src/data/faqData.js`: FAQ answers are deliberately non-committal until the exact policies are confirmed.
- `src/data/footerData.js`: the footer email is a temporary personal address.
- `src/pages/UserPages/{Dashboard,MyOrder,MyProfile,TrackMyOrder}.jsx`: one-line stubs with no links to them; there is no orders feature.
- `src/data/pressData.js` and the commented-out blocks in `teamData.js`, `Press.jsx` and `Team.jsx`: kept on purpose so press items and the "join our team" section are easy to reinstate.
