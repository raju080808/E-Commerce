import { useEffect, useState } from "react";
import axios from "axios";
import CartProduct from "../cartCard/cartCard"; 
import "./cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(res.data);

      setCart(res.data.items || []);

    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromUI = (productId) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-page">

      <h2>My Cart</h2>

      {loading && <p>Loading cart...</p>}

      {!loading && cart.length === 0 && (
        <p>Your cart is empty 😊</p>
      )}

      <div className="cart-list">
        {cart.map((item, index) => (
          <CartProduct 
            key={index}
            item={item}
            onRemove={handleRemoveFromUI}
          />
        ))}
      </div>

    </div>
  );
}
