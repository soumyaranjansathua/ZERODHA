import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const wakeTimer = setTimeout(() => {
      if (isMounted) setIsWakingUp(true);
    }, 2500);

    axios
      .get(`${API_BASE_URL}/allPositions`)
      .then((res) => {
        if (isMounted) {
          setAllPositions(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
          setIsWakingUp(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching positions:", err);
          setError("Failed to fetch positions.");
          setLoading(false);
          setIsWakingUp(false);
        }
      })
      .finally(() => {
        clearTimeout(wakeTimer);
      });

    return () => {
      isMounted = false;
      clearTimeout(wakeTimer);
    };
  }, [refreshKey]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {isWakingUp && (
        <div style={{ background: "#e8f4fd", border: "1px solid #b8daff", padding: "10px 14px", borderRadius: "6px", marginBottom: "15px", color: "#004085", fontSize: "14px" }}>
          ⏱️ Connecting to server... Free tier cloud servers take ~30s to wake up on first request.
        </div>
      )}

      {loading && !isWakingUp && (
        <p style={{ color: "#666", padding: "15px 0" }}>Loading your positions...</p>
      )}

      {error && (
        <div style={{ background: "#f8d7da", border: "1px solid #f5c6cb", padding: "10px", borderRadius: "6px", color: "#721c24", margin: "10px 0" }}>
          {error}
        </div>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.length === 0 && !loading && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                  No open positions found.
                </td>
              </tr>
            )}

            {allPositions.map((stock, index) => {
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const investedValue = (stock.avg || 0) * (stock.qty || 0);
              const pl = curValue - investedValue;
              const isProfit = pl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product || "CNC"}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? Number(stock.avg).toFixed(2) : "0.00"}</td>
                  <td>{stock.price ? Number(stock.price).toFixed(2) : "0.00"}</td>
                  <td className={profClass}>{pl.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
