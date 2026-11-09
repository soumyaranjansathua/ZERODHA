import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

const Summary = () => {
  const { user, refreshKey } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_BASE_URL}/allHoldings`)
      .then((res) => {
        if (isMounted) {
          setHoldings(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const totalInvestment = holdings.reduce(
    (acc, stock) => acc + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const currentValue = holdings.reduce(
    (acc, stock) => acc + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalPL = currentValue - totalInvestment;
  const plPercentage =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isProfit = totalPL >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.username || "Trader"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>4.04k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>3.76k</span>{" "}
            </p>
            <p>
              Opening balance <span>4.04k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({loading ? "..." : holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              ₹{(Math.abs(totalPL) / 1000).toFixed(2)}k{" "}
              <small>{isProfit ? `+${plPercentage}%` : `${plPercentage}%`}</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{(currentValue / 1000).toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>₹{(totalInvestment / 1000).toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
