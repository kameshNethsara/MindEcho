import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login, getMyDetails } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import FloatingLeaves from "../components/FloatingLeaves"; // ensure path is correct
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Credentials",
        text: "Please enter both email and password.",
      });
      return;
    }

    try {
      const data: any = await login(email, password);

      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        const resData = await getMyDetails();
        setUser(resData.data);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back 😊",
          timer: 1200,
          showConfirmButton: false,
        });

        // navigate("/home");
        const roles: string[] = resData.data.roles || [];
        if (roles.includes("admin")) {
          navigate("/admin-home");
        } else {
          navigate("/home");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your credentials.",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      {/* 🌿 Floating leaves in the background */}
      <FloatingLeaves />

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md transform hover:scale-101 transition-transform duration-300 z-10">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * {
              font-family: 'Poppins', sans-serif;
            }
          `}
        </style>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            MindEcho
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to continue your wellness journey</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-semibold hover:text-blue-600 transition-colors duration-200">
              Sign Up
            </Link>
          </p>
          
          <div className="flex justify-center mt-1">
          <Link
            to="/forgot-password"
            className="text-sm text-purple-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Forgot Password?
          </Link>
        </div>

        </div>
      </div>
    </div>
  );
}
