import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUpComponent/SignUp";
import SignIn from "./components/signInComponent/login";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedLayout from "./components/protectedLayout";
import Cart from "./cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />} />
             <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
