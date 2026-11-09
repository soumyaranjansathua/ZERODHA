import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  refreshKey: 0,
  triggerRefresh: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [user, setUser] = useState(null);

  // Cross-origin token check on mount (e.g. redirected from frontend ?token=...&username=...)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token");
    const usernameFromUrl = queryParams.get("username") || queryParams.get("user");
    const emailFromUrl = queryParams.get("email");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      if (usernameFromUrl) localStorage.setItem("username", usernameFromUrl);
      if (emailFromUrl) localStorage.setItem("email", emailFromUrl);

      // Clean query parameters from URL without reloading
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (savedToken) {
      setUser({
        token: savedToken,
        username: savedUsername || "Trader",
        email: savedEmail || "",
      });
    }
  }, []);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        refreshKey,
        triggerRefresh,
        user,
        setUser,
        logout,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
