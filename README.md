# 🧠 AI Customer Health Analyst

> A Gainsight-style customer success platform that identifies at-risk accounts, surfaces actionable insights, and helps CSMs act fast — before customers churn.

---

## 📌 Overview

AI Customer Health Analyst is a full-stack SaaS application built for Customer Success teams. It analyses behavioral signals — login activity, product usage trends, support ticket volume, and renewal timelines — to generate a health score for every customer and recommend the right next action.

Built to demonstrate real-world Gainsight-aligned workflows: health scoring, risk detection, CTA creation, and CSM email generation.

---

## ✨ Features

- **Authentication** — Secure login and signup with JWT-based session management
- **Analytics Dashboard** — Portfolio-level view with stat cards, health distribution charts, MRR at risk, and upcoming renewals
- **Health Scoring Engine** — Rule-based scoring (0–100) that classifies customers as Good, Warning, or At Risk
- **Issue Detection** — Automatically flags login inactivity, usage drops, high support load, and renewal risk
- **Recommended Actions** — Context-aware next steps generated per customer based on detected issues
- **CTA Suggestions** — Gainsight-style Call-To-Action labels for immediate CSM follow-up
- **Email Draft Generator** — Ready-to-send, tone-appropriate customer emails generated automatically
- **Customer List & Filters** — Browse, search, and filter your entire portfolio by health status
- **Click-to-Analyse** — Click any customer in the list or risk table to jump straight to their analysis

---

## 🖥️ Application Screens

### Dashboard
Portfolio-wide analytics at a glance — total customers, total MRR, MRR at risk, customers needing attention, upcoming renewals, health distribution donut chart, and MRR breakdown by health status.

### Customer List
A filterable table of all customers with health score, plan, MRR, renewal timeline, and a direct link to analyse any account.

### Customer Analysis
Full deep-dive into a single customer — health score with visual progress bar, flagged issues, numbered recommended actions, CTA label, and a copy-ready email draft.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | SQLite (better-sqlite3) |
| Auth | JWT (jsonwebtoken + bcrypt) |
| Charts | Recharts |
| Data | Mock customer data (10 accounts) |

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- npm

### Backend

```bash
cd server
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

### Test Account

```
Email:    test@gainsight.com
Password: Test@123
```

---

## 🗺️ Roadmap

- **Real Gainsight API integration** — Connect to live Gainsight data via REST API
- **Predictive churn scoring** — ML-based model trained on historical usage signals
- **Automated CTA creation** — Push CTAs directly into Gainsight from the app
- **CSM workload view** — Assign and track customer actions across team members
- **Slack / email alerts** — Proactive notifications when a customer health drops
- **Custom scoring rules** — Admin panel to configure thresholds per segment or plan

---

## 👩‍💻 About

Built by **Soumya** as a portfolio project demonstrating full-stack engineering and Gainsight domain expertise.

This project simulates real Customer Success workflows — from health scoring to CSM action recommendations — using industry-aligned logic and a production-quality UI.

> *Designed for recruiters, hiring managers, and CS teams looking for engineers who understand both the product and the domain.*
