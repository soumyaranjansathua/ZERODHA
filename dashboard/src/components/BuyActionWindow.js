import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBuyClick = async (e) => {
    e.preventDefault();
    if (stockQuantity <= 0) {
      setErrorMessage("Quantity must be at least 1");
      return;
    }
    if (stockPrice <= 0) {
      setErrorMessage("Price must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await axios.post(`${API_BASE_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
        product: "CNC",
      });

      // Notify parent components to reload data without refreshing whole window
      triggerRefresh();
      closeBuyWindow();
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  const marginRequired = (Number(stockQuantity) * Number(stockPrice)).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4 style={{ margin: "5px 0 15px 0", color: "#444" }}>Buy {uid}</h4>
        {errorMessage && (
          <p style={{ color: "#d9534f", fontSize: "13px", margin: "5px 0" }}>
            {errorMessage}
          </p>
        )}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              value={stockQuantity}
              disabled={isSubmitting}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(parseFloat(e.target.value) || 0)}
              value={stockPrice}
              disabled={isSubmitting}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{marginRequired}</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? "Placing..." : "Buy"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            style={{ marginLeft: "8px", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
