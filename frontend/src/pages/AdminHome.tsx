import { } from 'react'
// import { Link } from "react-router-dom";
import AdminNavBar from '../components/AdminNavBar'
// import MoodBarChart from "../components/MoodBarChart";
// import { moods } from '../constants/moods';
// import { useJournal } from "../context/JournalContext";
// import { useAnalytics } from "../context/AnalyticsContext";

export default function AdminHome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">

      {/* Global font style */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      {/* NavBar */}
      <AdminNavBar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Admin Hero Section */}
          <section id="admin-hero" className="py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Admin Dashboard
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Emotional Analytics
                  </span>
                </h1>

                <p className="text-xl text-gray-600">
                  Monitor overall emotional trends, user engagement, and mental wellness
                  insights across the entire platform.
                </p>

                <div className="flex gap-4">
                  <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-medium">
                    📊 Real-time Insights
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
                    👥 All Users
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-3xl h-96 flex flex-col items-center justify-center shadow-2xl text-white">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-2xl font-semibold mb-2">MindEcho Admin</h3>
                <p className="text-white/80 text-center px-6">
                  Data-driven emotional wellness overview
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 MindEcho. Empowering emotional wellness through AI.
          </p>
        </div>
      </footer>

    </div>
  );
}
