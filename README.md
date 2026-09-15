# UK Self Assessment Calculator 



A practice fullstack project: a calculator that estimates UK self-assessment
tax based on rental income, rental expenses, a configurable profit-share
percentage, and salary. Built to apply skills from a 12-week fullstack
devops course.

## Tech Stack

- **Client:** React (Vite)
- **Server:** Node.js, Express
- **Other:** cors, dotenv-style env vars via Vite (`VITE_API_URL`) and
  Node (`process.env.PORT`)

## Project Structure
```
uk-self-assessment-calc/
├── client/ # React frontend (Vite)
└── server/ # Express backend
```

## Server Setup
```
cd server
npm install
node index.js
```

The server starts on `http://localhost:3001` by default (or `PORT` from
the environment, for deployment).

### Routes (so far)

- `GET /` — health check, returns a welcome message.
- `POST /calculate` — not yet rebuilt (in progress).

## Client Setup

Not yet rebuilt (in progress).

## Status

16 Sep 2026

Rebuilding from scratch as of [today's date] to clean up the codebase
after several rounds of iterative debugging. See git history for the
previous working version.