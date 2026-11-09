// Configuration for Frontend API and Dashboard URLs
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (isLocalhost ? "http://localhost:3002" : "https://zerodha-1-znoy.onrender.com");

export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (isLocalhost ? "http://localhost:3001" : "https://zerodha-2-tbma.onrender.com");

