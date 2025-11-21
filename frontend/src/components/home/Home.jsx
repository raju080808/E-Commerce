import { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import axios from "axios";
import "./home.css";

export default function Home() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`  // <-- TOKEN SENT HERE
          }
        });

        setProducts(res.data.products || res.data);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div className="home">
      <h1 className="home-heading">Quality You Want. Prices You'll Love.</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Footwear</option>
          <option>Women Fashion</option>
          <option>Men Fashion</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
        //   <ProductCard
        //     key={product._id}
        //     image={product.image}
        //     name={product.name}
        //     description={product.description}
        //     price={product.price}
        //     onAdd={() => alert(product.name + " added to cart!")}
        //   />
        <ProductCard key={product._id} product={product} />

        ))}
      </div>
    </div>
  );
}
