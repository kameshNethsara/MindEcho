import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            MindEcho
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link className="nav-link" to="/admin-home">Home</Link>
            <Link className="nav-link" to="/admin-users">User</Link>
            <Link className="nav-link" to="/admin-analytics">Analytics</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
            <div id="profile-logout" className="text-center">
              <button
                onClick={handleLogout}
                className="bg-white text-gray-700 border-2 border-gray-300 px-10 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <Link className="mobile-link" to="/admin-home" onClick={() => setOpen(false)}>Home</Link>
            <Link className="nav-link" to="/admin-users" onClick={() => setOpen(false)}>User</Link>
            <Link className="nav-link" to="/admin-analytics" onClick={() => setOpen(false)}>Analytics</Link>
            <Link className="mobile-link" to="/profile" onClick={() => setOpen(false)}>Profile</Link>
          </div>
        </div>
      </div>

      {/* Extra Styles */}
      <style>{`
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: #9333ea;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .mobile-link {
          font-size: 1rem;
          padding: 0.5rem 0;
          color: #4b5563;
          font-weight: 500;
          border-bottom: 1px solid #e5e7eb;
        }
        .mobile-link:hover {
          color: #9333ea;
        }
      `}</style>
    </nav>
  );
}
