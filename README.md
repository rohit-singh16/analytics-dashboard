# Call Analytics Dashboard

A React + TypeScript web application built as part of the **Fullstack Engineer – Frontend Development Assessment**.  
The application visualizes call analytics data for voice agents with a modern, futuristic UI inspired by **superbryn.com**.

---

## 🔗 Live Demo

**Hosted on Netlify:**  
👉 https://analytics-dashboardproject.netlify.app

---

## 📌 Assessment Requirements Covered

This project fulfills all frontend assessment requirements:

- ReactJS + TypeScript application  
- Modern UI inspired by https://superbryn.com  
- Call analytics charts using dummy data  
- Ability to overwrite values for at least one chart  
- Email-based persistence using Supabase  
- Overwrite confirmation when existing data is found  
- Deployed web endpoint on cloud  

---

## ✨ Features

- **Interactive Call Analytics Dashboard**
  - Weekly Call Volume (Area Chart)
  - Call Distribution (Donut Chart)

- **User Input & Persistence**
  - Users provide an email before editing analytics
  - Custom values are saved in Supabase against the email
  - Previously saved values are fetched automatically
  - Overwrite confirmation shown before updating data

- **Modern UI / UX**
  - Dark, futuristic theme
  - Animated background with subtle floating nodes
  - Glassmorphism cards
  - Smooth transitions and chart animations

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite  
- **Styling:** Tailwind CSS + custom CSS  
- **Charts:** Recharts  
- **Animations:** Framer Motion  
- **Backend / Database:** Supabase (PostgreSQL)  
- **Deployment:** Netlify  

---

## 🗂️ Project Structure

├── public/
│ └── _redirects
├── src/
│ ├── components/
│ │ ├── CallVolumeChart.tsx
│ │ ├── CallDistributionChart.tsx
│ │ └── FuturisticBackground.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── App.tsx
│ └── main.tsx
├── index.css
├── tailwind.config.ts
└── package.json

## ⚙️ Local Setup & Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rohit-singh16/analytics-dashboard.git
cd analytics-dashboard
2️⃣ Install dependencies
bash
npm install
3️⃣ Create .env file
env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4️⃣ Run locally
bash
npm run dev
☁️ Deployment
The project is deployed using Netlify (GitHub-based CI/CD).

Environment variables are configured in Netlify dashboard.

_redirects file ensures proper SPA routing.

🧠 Technical Decisions (Brief)
Supabase was chosen for fast setup, persistence, and real-time capability.

Email-based storage satisfies overwrite and retrieval requirements without authentication friction.

Recharts provides performant and customizable data visualizations.

Netlify enables simple, reliable frontend deployment with environment variable support.

🔒 Security Note
This project intentionally allows public read/write access for demo purposes.
In a production setup, Supabase Auth and stricter Row Level Security policies would be applied.
<img width="1876" height="578" alt="image" src="https://github.com/user-attachments/assets/ef3d854c-a452-4f6b-bfec-82bd1d33b360" />
<img width="1850" height="734" alt="image" src="https://github.com/user-attachments/assets/703a0b00-67db-40c8-8d68-7b81e6a8231f" />
<img width="1828" height="715" alt="image" src="https://github.com/user-attachments/assets/82da7774-cdbb-4d28-b161-f882cf0ec588" />
<img width="1870" height="797" alt="image" src="https://github.com/user-attachments/assets/ff32d53d-1dce-4864-9bd1-6af1379f8e62" />




