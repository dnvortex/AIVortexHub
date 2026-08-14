# DN VORTEX – AI Solutions & Development

A professional AI-powered website offering AI agent development, custom AI applications, full-stack web development, online AI courses, subscription plans, and pre-built AI templates.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Wouter (routing)
- **Backend**: Express.js (Node.js), TypeScript
- **Database**: PostgreSQL via Neon serverless (`@neondatabase/serverless`) with Drizzle ORM
- **Auth/Storage**: Firebase (Auth + Firestore + Storage)
- **Media**: Cloudinary for image uploads
- **Session**: `express-session` with `SESSION_SECRET`

## Project Structure

```
client/          # React frontend
  src/
    pages/       # Route-level page components
    components/  # Reusable UI components
    hooks/       # Custom React hooks
    lib/         # Utilities
server/          # Express backend
  index.ts       # Entry point
  routes.ts      # API routes
  db.ts          # PostgreSQL/Drizzle setup
  firebaseAdmin.ts   # Firebase Admin SDK
  firebaseStorage.ts # Firebase Storage helpers
  cloudinaryService.ts # Cloudinary helpers
  storage.ts     # Storage abstraction layer
shared/
  schema.ts      # Drizzle schema (shared between client and server)
```

## Required Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret |
| `FIREBASE_API_KEY` | Firebase client API key |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Admin service account JSON (optional, for production) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## How to Run Locally

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up the required environment variables listed above (e.g. in a `.env` file or your platform's secrets manager).

3. Push the database schema:

```bash
npm run db:push
```

4. Start the development server:

```bash
npm run dev
```

The app (API + frontend) will be served on **port 5000**.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (API + frontend on port 5000) |
| `npm run build` | Build frontend with Vite and bundle server with esbuild |
| `npm start` | Run production build (`NODE_ENV=production`) |
| `npm run check` | TypeScript type-checking |
| `npm run db:push` | Push Drizzle schema changes to the database |
