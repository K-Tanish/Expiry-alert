<div align="center">
  <br/>
  <h1>🛡️ Expirix</h1>
  <p><strong>Never let a critical business record expire unnoticed.</strong></p>
  <p>
    <a href="https://github.com/K-Tanish/Expiry-alert/stargazers">
      <img src="https://img.shields.io/github/stars/K-Tanish/Expiry-alert?style=flat-square&color=0d9488" alt="Stars" />
    </a>
    <img src="https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-3178c6?style=flat-square" alt="Stack" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>
  <br/>
</div>

---

## What is Expirix?

Companies like Tata Steel, Reliance, and thousands of SMEs manage hundreds of important documents every year — vendor contracts, compliance certificates, safety training records, government licenses. Every one of them has an expiry date.

Most companies still track these in Excel sheets. Nobody checks them regularly. Then one day, a manager discovers a contract lapsed three months ago.

**Expirix fixes that.** It's a record intelligence platform that automatically classifies every document as Active, Expiring Soon, or Expired — and makes sure the right people know before it's too late.

---

## Features

- **Dashboard** — Instant visibility into your entire record portfolio at a glance
- **Auto-classification** — Records are automatically marked Active, Expiring Soon, or Expired. No manual tagging
- **Action Required** — The most urgent records are always pinned to the top. No hunting through tables
- **Alert Dispatch** — Select which expiring records to escalate and send targeted email notifications per record
- **Calendar View** — See the full month's expiry landscape and plan ahead
- **Analytics** — Understand which document categories carry the most risk
- **CSV Import** — Migrate your existing Excel data in one click
- **Record Management** — Add, edit, renew, and search records with ease

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/K-Tanish/Expiry-alert.git
cd Expiry-alert

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` and you're in. The app loads with a realistic seed database so you can explore all features immediately — no setup required.

---

## Sample Data

A `sample_entries.csv` file is included in the root directory. You can import it via the **Import CSV** button in the Records view to test the bulk upload flow with pre-formatted data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | TailwindCSS |
| Routing | React Router v6 |
| Icons | Lucide React |
| Storage | Browser LocalStorage |

---

## Project Structure

```
src/
├── components/       # All UI components (Dashboard, Records, Calendar, etc.)
├── data/             # Seed data and database logic
└── types.ts          # Shared TypeScript types
```

---

## Built By

**Tanish Kadam** — Built for a national hackathon focused on solving real enterprise compliance problems.

> *"The goal is not to build a document storage platform. The goal is to ensure that critical business records never expire unnoticed."*
