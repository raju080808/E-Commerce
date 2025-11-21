import { useState } from "react";
import axios from "axios";
import "./cartCard.css";

export default function CartProduct({ item, onRemove }) {

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleBuyNow = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg({ type: "error", text: "Please login to continue" });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId: item.product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg({ type: "success", text: "Order placed successfully!" });

    } catch (err) {
      const message = err?.response?.data?.message || "Failed to order";
      setMsg({ type: "error", text: message });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 2500);
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${item.product._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onRemove) onRemove(item.product._id);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-product-card">

      <img
        src={item.product.image}
        alt={item.product.name}
        className="cart-product-img"
      />

      <div className="cart-product-info">
        <h4>{item.product.name}</h4>
        <p>₹{item.product.price}</p>
      </div>

      <div className="cart-product-actions">
        <button
          className="buy-btn"
          onClick={handleBuyNow}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>

        <button
          className="remove-btn"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>

      {msg && (
        <p
          style={{
            marginTop: 6,
            fontSize: "13px",
            color: msg.type === "error" ? "red" : "green"
          }}
        >
          {msg.text}
        </p>
      )}

    </div>
  );
}
