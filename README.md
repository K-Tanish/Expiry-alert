<div align="center">
  <br/>
  <h1>🛡️ Expirix</h1>
  <p><strong>Never let a critical business record expire unnoticed.</strong></p>
  <p>
    <a href="https://github.com/K-Tanish/Expiry-alert/stargazers">
      <img src="https://img.shields.io/github/stars/K-Tanish/Expiry-alert?style=flat-square&color=0d9488" alt="Stars" />
    </a>
    <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite" alt="Vite" />
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

## 📋 Note for Reviewers

Hi — thanks for taking the time to look at this.

The app loads with a pre-filled database of realistic records so you don't need to add anything to explore it. Here's where I'd suggest starting:

1. **Dashboard** — This is the heart of the product. The status cards, the priority queue below them, and the gauge chart are all live and connected to real data.
2. **Action Required** — Click the deep red card. It takes you straight to the records that need attention right now.
3. **Send Alerts** — From the indigo card, you can select specific expiring records and see the alert dispatch flow.
4. **Calendar** — Shows expiry dates mapped across the month. Great for planning ahead.
5. **Import CSV** — Go to Records → Import, and use the included `sample_entries.csv` file to test bulk upload.

Everything runs in the browser — no login, no backend, no environment variables needed.

---

## Features

- **Dashboard** — Instant visibility into your entire record portfolio at a glance
- **Auto-classification** — Records are automatically marked Active, Expiring Soon, or Expired. No manual tagging
- **Action Required** — The most urgent records are always pinned to the top. No hunting through tables
- **Alert Dispatch** — Select which expiring records to escalate and send targeted notifications per record
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

## 🛠️ Tools & Technologies

| What | Why it matters |
|---|---|
| **React 19** | Latest stable React — concurrent rendering means the UI stays responsive even with large record sets |
| **TypeScript 5.8** | Every record, status, and prop is strictly typed — no silent bugs, no guesswork |
| **Vite 6** | Sub-second hot reload during development, and a production build that compiles in under 7 seconds |
| **TailwindCSS v4** | Utility-first styling with the newest engine — no custom CSS files, consistent design system throughout |
| **React Router v7** | Client-side routing with no page reloads — the app feels instant when switching between views |
| **Lucide React** | A clean, consistent icon library that keeps the UI readable without visual noise |
| **Browser LocalStorage** | Zero-config persistence — works offline, no database setup, data survives page refreshes |

---

## Sample Data

A `sample_entries.csv` file is included in the root directory. You can import it via the **Import CSV** button in the Records view to test the bulk upload flow with pre-formatted data.

---

## Project Structure

```
src/
├── components/       # All UI components (Dashboard, Records, Calendar, Analytics, etc.)
├── data/             # Seed data and auto-classification logic
└── types.ts          # Shared TypeScript interfaces
```

---

## Built By

**Tanish Kadam** — Built for a national hackathon focused on solving real enterprise compliance problems.

> *"The goal is not to build a document storage platform. The goal is to ensure that critical business records never expire unnoticed."*
