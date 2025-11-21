import { useState } from "react";
import axios from "axios";
import "./productCard.css";

export default function ProductCard({ product }) {

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setMsg({ type: "error", text: "Please login to add items to cart." });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
console.log(res.data)
      setMsg({ type: "success", text: res.data.message || "Added to cart" });

    } catch (err) {
      console.error("Add to cart error:", err);
      const message = err?.response?.data?.message || "Failed to add to cart";
      setMsg({ type: "error", text: message });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 2500);
    }
  };

  return (
    <div className="product-card">
      
      <img src={product.image} alt={product.name} className="product-img" />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>

      <div className="product-footer">
        <span className="product-price">₹{product.price}</span>

        <button className="add-btn" onClick={handleAddToCart} disabled={loading}>
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {msg && (
        <p
          style={{
            marginTop: 8,
            color: msg.type === "error" ? "red" : "green",
            fontSize: "13px"
          }}
        >
          {msg.text}
        </p>
      )}

    </div>
  );
}
