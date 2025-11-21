import React, { useState } from "react";
import axios from "axios";
import './signUp.css';
import {  useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate=useNavigate()
  const [userData, setUserData] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
    conformPassword: ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
    conformPassword: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    switch (name) {
      case "fullName":
        setErrors({
          ...errors,
          fullName:
            value.length < 3 ? "Name must be at least 3 characters" : ""
        });
        break;

      case "number":
        setErrors({
          ...errors,
          number: numberRegex.test(value)
            ? ""
            : "Mobile number must be exactly 10 digits"
        });
        break;

      case "email":
        setErrors({
          ...errors,
          email: emailRegex.test(value) ? "" : "Invalid email format"
        });
        break;

      case "password":
        setErrors({
          ...errors,
          password: passwordRegex.test(value)
            ? ""
            : "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"
        });
        break;

      case "conformPassword":
        setErrors({
          ...errors,
          conformPassword:
            value === userData.password ? "" : "Passwords do not match"
        });
        break;

      default:
        break;
    }
  };

  const isFormValid =
    Object.values(errors).every((err) => err === "") &&
    Object.values(userData).every((val) => val !== "");

  const submitForm = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fix all errors before submitting");
      return;
    }

    try {
      const { conformPassword, ...cleanData } = userData;

      const payload = {
        ...cleanData,
        number: Number(cleanData.number)
      };

      const response = await axios.post(
        "http://localhost:5000/api/signup",
        payload
      );

      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={submitForm}>
        <h1 className="formHeading">Registration Form</h1>

        <label>Full Name :</label>
        <input
          type="text"
          placeholder="Enter full name"
          required
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
        />

        <label>Number :</label>
        <input
          type="text"
          placeholder="Enter 10 digit number"
          required
          name="number"
          value={userData.number}
          onChange={handleChange}
        />

        <label>Email :</label>
        <input
          type="text"
          placeholder="Enter email"
          required
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label>Password :</label>
        <input
          type="password"
          placeholder="Enter password"
          required
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <label>Confirm Password :</label>
        <input
          type="password"
          placeholder="Enter password again"
          required
          name="conformPassword"
          value={userData.conformPassword}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          Save
        </button>
        <p style={{ marginTop: "10px", color:"black" }}>
          Alrady have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}
