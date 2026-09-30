# TalkNest

TalkNest is an original anonymous voice room platform inspired by the concept of lightweight, topic-based social conversations for India. This MVP focuses on the core flow: anonymous onboarding, room discovery, room creation, joining discussions, live room experience, text chat, moderation, and an admin console.

## Features included

- Friendly landing page with original branding
- Anonymous onboarding without signup/email
- Dashboard showing live rooms and discovery filters
- Public room creation and room joining flow
- Real-time room UI with speaker/listener views
- Text chat panel in room experience
- Safety tools: report, block, and mute interaction states
- Mock real-time voice mode with Socket.IO support
- Admin dashboard and moderation queue
- PostgreSQL schema and Docker setup

## Tech stack

- Frontend: Next.js 14 + React
- Backend: Next.js route handlers + Socket.IO
- Database: PostgreSQL schema included as SQL
- Voice abstraction: ready for LiveKit/Agora/Twilio-style integration via a mock mode

## Quick start

1. Install dependencies:
   npm install
2. Create your environment file:
   cp .env.example .env
3. Run the app:
   npm run dev
4. Open the app in your browser:
   http://localhost:3000

## Environment variables

See `.env.example` for required env keys.

## Database schema

The PostgreSQL schema is available in `schema.sql`.

## Docker

A simple Docker setup is included with `Dockerfile` and `docker-compose.yml`.

## Notes

This is an MVP designed to be extended into production. The app uses mock data and a development voice room mode if production voice providers are not configured.

## Project structure

- `app/` – app pages, route handlers, and UI screens
- `lib/` – mock data and room store
- `schema.sql` – PostgreSQL schema
- `server.js` – Socket.IO + Next.js custom server
- `.env.example` – app configuration helpers
- `Dockerfile`, `docker-compose.yml` – deployment scaffolding

## Safety center

The product includes a structured moderation and safety model with room reports, blocking, and admin review flows.
