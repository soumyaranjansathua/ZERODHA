import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // If server takes > 2.5s, it is likely on Render cold start
    const wakeTimer = setTimeout(() => {
      if (isMounted) setIsWakingUp(true);
    }, 2500);

    axios
      .get(`${API_BASE_URL}/allHoldings`)
      .then((res) => {
        if (isMounted) {
          setAllHoldings(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
          setIsWakingUp(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching holdings:", err);
          setError("Failed to fetch holdings. The server might be waking up.");
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

  // Dynamic calculations
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalPL = currentValue - totalInvestment;
  const plPercentage =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price (₹)",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(56, 126, 209, 0.6)",
        borderColor: "rgba(56, 126, 209, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title">Holdings ({allHoldings.length})</h3>
      </div>

      {isWakingUp && (
        <div style={{ background: "#e8f4fd", border: "1px solid #b8daff", padding: "10px 14px", borderRadius: "6px", marginBottom: "15px", color: "#004085", fontSize: "14px" }}>
          ⏱️ Connecting to server... Free tier cloud servers take ~30s to wake up on first request. Thank you for your patience!
        </div>
      )}

      {loading && !isWakingUp && (
        <p style={{ color: "#666", padding: "15px 0" }}>Loading your holdings...</p>
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
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length === 0 && !loading && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                  No holdings found.
                </td>
              </tr>
            )}

            {allHoldings.map((stock, index) => {
              const curVal = (stock.price || 0) * (stock.qty || 0);
              const investedVal = (stock.avg || 0) * (stock.qty || 0);
              const pl = curVal - investedVal;
              const isProfit = pl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{curVal.toFixed(2)}</td>
                  <td className={profClass}>{pl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || "0.00%"}</td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPL >= 0 ? "profit" : "loss"}>
            ₹{totalPL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalPL >= 0 ? "+" : ""}{plPercentage}%)
          </h5>
          <p>Total P&L</p>
        </div>
      </div>

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;
