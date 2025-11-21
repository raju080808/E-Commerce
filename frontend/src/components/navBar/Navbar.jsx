import { Link, useNavigate } from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/");
  };

  return (
    <div >
      <div className="navContainer">

        <div className="title">
          <h2>Power House</h2>
        </div>

        <div className="links">
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div>
          <button className="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>

      </div>
     
    </div>
  );
}
