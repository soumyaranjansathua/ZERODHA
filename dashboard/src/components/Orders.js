import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get(`${API_BASE_URL}/allOrders`)
      .then((res) => {
        if (isMounted) {
          setOrders(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching orders:", err);
          setError("Failed to load orders.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  if (loading) {
    return <p style={{ color: "#666", padding: "20px" }}>Loading your orders...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "#d9534f" }}>
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const orderTime = order.createdAt
                ? new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "Today";

              return (
                <tr key={index}>
                  <td>{orderTime}</td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: order.mode === "SELL" ? "#fce8e6" : "#e8f0fe",
                        color: order.mode === "SELL" ? "#c5221f" : "#1a73e8",
                      }}
                    >
                      {order.mode || "BUY"}
                    </span>
                  </td>
                  <td><strong>{order.name}</strong></td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td>
                    <span style={{ color: "#2e7d32", fontWeight: "500" }}>COMPLETE</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
