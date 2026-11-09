# Zerodha Clone (Full-Stack Trading Platform)

A full-stack Zerodha Kite clone built with **React**, **Node.js/Express**, and **MongoDB Atlas**.

---

## 📁 Project Structure

```
ZERODHA_Clone/
├── backend/       # Express REST API, MongoDB Mongoose models, JWT & bcrypt auth
├── dashboard/     # Kite Trading Dashboard (Holdings, Orders, Positions, Watchlist, Charts)
└── frontend/      # Zerodha Public Landing Page (Home, Pricing, Products, About, Support, Auth)
```

---

## ⚡ Solutions for Render Cold Starts & Speed Issues

### Why Render takes time to open:
On Render's Free Tier, services automatically go to sleep after **15 minutes of inactivity**. When a visitor opens the app, Render spins up the container, taking **30 to 50 seconds** for the first request ("cold start"). Because the frontend, dashboard, and backend were deployed separately, the frontend would load but freeze while waiting for the sleeping backend.

### What has been fixed & implemented:
1. **Lightweight Health Endpoint (`GET /health` & `GET /`)**:
   - Responds with instant 200 OK, database connection status, and server uptime.
2. **Cold Start UI Notifications**:
   - Both Frontend and Dashboard now display a user-friendly notice (*"Connecting to server... Free cloud servers take ~30s to wake up on first load"*) if a request takes more than 2.5 seconds, preventing the impression that the app is broken.
3. **Keep-Alive Solution (Zero Delay 24/7)**:
   - You can keep your free Render backend awake 24/7 with zero cold starts by setting up a free ping check:
     1. Go to [cron-job.org](https://cron-job.org) or [UptimeRobot](https://uptimerobot.com) (100% free).
     2. Create a HTTP monitor pointing to your Render backend:
        ```
        https://<your-backend-service>.onrender.com/health
        ```
     3. Set the interval to **every 10 minutes**.
     4. Render will never put your server to sleep, and your website will load instantly!

---

## 🔐 Authentication & Cross-Domain Fixes

### The Problem:
- There was no `/login` endpoint on the backend and no Login page on the frontend.
- Passwords were stored in plain text without bcrypt hashing.
- When registering on `frontend` (e.g. `frontend.onrender.com`), the JWT token was stored in the frontend's `localStorage`. When redirecting to the separate `dashboard` domain (e.g. `dashboard.onrender.com`), the dashboard had no access to the frontend's `localStorage` due to browser origin isolation.

### The Fixes:
1. **Backend Authentication**:
   - Added secure password hashing with `bcryptjs` (salt rounds = 10) in `UsersSchema`.
   - Added `POST /login` with email/username and password verification.
   - Added `POST /signup` with validation and duplicate prevention.
   - Added `GET /user` protected route with JWT bearer token verification.
   - Extended JWT validity to 7 days.
2. **Frontend Login & Signup**:
   - Built a complete, dedicated **Kite Login Page** (`/login`) with Zerodha styling.
   - Connected Navbar links ("Login", "Signup", "Kite Dashboard", "Logout").
   - Implemented cross-domain token handover: on login or registration, the frontend securely passes `token` and `user` to the dashboard redirect URL (`?token=...&username=...`).
3. **Dashboard Session Handling**:
   - On load, `GeneralContext` extracts the token and user details from the URL parameters, stores them in the dashboard's own `localStorage`, and cleans the URL without reloading.
   - Added interactive Profile dropdown in the top navigation bar showing the user's name, email, and a working "Sign out" button.

---

## 🛠️ Summary of All Bug Fixes

| Area | Issues Found | How It Was Fixed |
|---|---|---|
| **Backend** | No `/login` endpoint; passwords in plain text | Added `POST /login`, `POST /signup` with `bcryptjs` hashing and schema methods |
| **Backend** | No endpoint to fetch placed orders | Added `GET /allOrders` with descending sort |
| **Backend** | Unhandled Mongoose connection & unhandled errors | Robust async MongoDB connection with error events and auto-seeding |
| **Backend** | Production start script used `nodemon` | Changed `"start"` to `node index.js`, `"dev"` to `nodemon index.js` |
| **Dashboard** | `BuyActionWindow.js` runtime crash (`GeneralContext.closeBuyWindow is not a function`) | Correctly hooked `useContext(GeneralContext)` and called `closeBuyWindow()` |
| **Dashboard** | Orders tab was hardcoded static text | Wired to `GET /allOrders` with real-time order table and live updates |
| **Dashboard** | Holdings summary row had hardcoded figures | Computes dynamic total investment, current value, and P&L from database |
| **Dashboard** | Watchlist search bar was non-functional | Added real-time search filtering on stocks as you type |
| **Dashboard** | Profile dropdown in Menu did not open | Implemented interactive dropdown with user info and Logout action |
| **Dashboard** | Hardcoded Render URLs in components | Centralized in `config.js` with localhost fallback |
| **Frontend** | Missing Login route and component | Created Kite `Login.js` and added `/login` route in `index.js` |
| **Frontend** | Broken image paths with Windows backslashes (`\`) | Replaced all with web-compliant forward slashes (`/media/images/...`) |
| **Frontend** | Dead "Sign Up Now" buttons on Home, Universe, etc. | Linked directly to `/signup` |
| **Frontend** | React `class` warnings and JSX-a11y warnings | Fixed all `className`, `alt` attributes, and valid anchor links |

---

## 🚀 Running Locally

### 1. Backend:
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:3002
```

### 2. Dashboard:
```bash
cd dashboard
npm install
npm start
# Running on http://localhost:3001 (or 3000)
```

### 3. Frontend:
```bash
cd frontend
npm install
npm start
# Running on http://localhost:3000
```

