# sanu-workspace

A personal productivity app I built while learning the MERN stack. It handles tasks, notes, and schedules — basically everything I kept forgetting to track. Ended up being one of my more complete projects so I kept improving it.

---

## What it does

- Add, edit, delete tasks (basic but works well)
- Notepad section for longer thoughts or ideas
- Calendar to plan out the week
- Works on phone and desktop without breaking

---

## Stack

- React + Vite (frontend)
- Node.js + Express (backend)
- MongoDB (database)
- Deployed on Render

---

## Running it locally

Clone it first:

```bash
git clone https://github.com/snehasanu64/sanu-workspace.git
cd sanu-workspace
```

Install everything:

```bash
npm run install-all
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_uri_here
PORT=5000
```

Then start it up:

```bash
npm run dev
```

Frontend runs on `localhost:5173`, backend on `localhost:5000`.

---

## Note

I use this as an actual personal workspace so I haven't shared the live link — there's personal data in there. But feel free to run it locally or go through the code.

---

Built by [Sneha](https://github.com/snehasanu64)
