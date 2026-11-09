// Configuration file for Dashboard API and endpoints
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (isLocalhost ? "http://localhost:3002" : "https://zerodha-1-znoy.onrender.com");

export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL ||
  (isLocalhost ? "http://localhost:3000" : "https://zerodha-clone-f831.onrender.com");

