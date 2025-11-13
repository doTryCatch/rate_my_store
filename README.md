# Rate My Store

Rate My Store is a small React application for creating, managing and rating stores.

## Features

- Role-based dashboard (ADMIN, USER, STORE_OWNER)
- Sign up, sign in, and session handling
- Admin user & store management (create users, create stores)
- Browse stores, search, and submit ratings
- Store owners can view ratings left for their stores

## Tech stack

- React + TypeScript
- Tailwind CSS for styles
- Axios for HTTP requests
- React Router for navigation
- MUI (Rating) and React Icons

## Quick Setup (Fast path)

1. Clone the repo and install dependencies

```powershell
git clone <repo-url>
cd rate_my_store
npm install
```

2. Add environment variables

Create a `.env` file in the project root (this repo already contains a sample `.env` file). The frontend expects the backend URL in `REACT_APP_API_URL`. Example:

```env
REACT_APP_API_URL=https://your-backend.example.com
```

If you omit `REACT_APP_API_URL`, the app will fall back to the production backend URL:
`https://rate-my-store-backend.onrender.com/api`.

3. Run the app (development)

```powershell
npm start
```

Open your browser at http://localhost:3000. The development server supports hot reloading.

4. Build for production

```powershell
npm run build
```

The optimized build will be emitted to the `build/` folder.

5. Run tests

```powershell
npm test
```

## Project structure (important files)

- `src/index.tsx` — app entry, router and auth provider
- `src/App.tsx` — routes for public and protected pages
- `src/AuthContext/getUser.tsx` — auth context and user/load logic
- `src/utils/api.ts` — axios instance, sets `baseURL` and `withCredentials`
- `src/pages` and `src/components` — UI and page components

## Common commands

- `npm install` — install deps
- `npm start` — start dev server
- `npm run build` — create production build
