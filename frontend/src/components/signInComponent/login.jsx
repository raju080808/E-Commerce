import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './login.css'
function SignIn() {
  const navigate = useNavigate();  

  const [userdata, setUserdata] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserdata({ ...userdata, [name]: value });

    if (name === "email") {
      setErrors({
        email: emailRegex.test(value) ? "" : "Invalid email format"
      });
    }
  };

  const isFormValid =
    errors.email === "" &&
    userdata.email !== "" &&
    userdata.password !== "";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", userdata);
      localStorage.setItem("accessToken", res.data.accessToken);
      alert("Login Successful!");
      console.log(res.data);
      navigate('/home')
    } catch (err) {
      alert("Login Failed!");
      console.log(err.response?.data?.message );
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin}>
        <h2>Login Form</h2>
        <label>Email :</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          name="email"
          value={userdata.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <label>Password :</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={userdata.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>

        <p style={{ marginTop: "10px", color:"black" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>

      </form>
    </div>
  );
}

export default SignIn;
