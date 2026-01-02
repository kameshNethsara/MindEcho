import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLeaves from "../components/FloatingLeaves";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Backend API call will go here later
    setTimeout(() => {
      setLoading(false);
      alert("Password reset link sent");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4">
        {/* 🌿 Floating leaves in the background */}
        <FloatingLeaves />
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * {
              font-family: 'Poppins', sans-serif;
            }
          `}
        </style>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-10">
        
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your email and we’ll send you a reset link
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-purple-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
    </div>
  );
}

export default ForgotPassword;
