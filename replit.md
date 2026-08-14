# DN VORTEX – AI Solutions & Development

A professional AI-powered website offering AI agent development, custom AI applications, full-stack web development, online AI courses, subscription plans, and pre-built AI templates.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Wouter (routing)
- **Backend**: Express.js (Node.js), TypeScript
- **Database**: PostgreSQL via Neon serverless (`@neondatabase/serverless`) with Drizzle ORM
- **Auth/Storage**: Firebase (Auth + Firestore + Storage)
- **Media**: Cloudinary for image uploads
- **Session**: `express-session` with `SESSION_SECRET`

## How to Run

```bash
npm run dev
```

Serves both the API and frontend on port 5000.

## Required Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret ✅ already set |
| `FIREBASE_API_KEY` | Firebase client API key |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Admin service account JSON (optional, for production) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

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

## User Preferences

(none recorded yet)
