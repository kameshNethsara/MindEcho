import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
// import EditProfileModal from "../components/EditProfileModal"
import { useJournal } from "../context/JournalContext";
import { getWeeklySummaryForProfile } from "../utils/analyticsUtils";
import AdminNavBar from "../components/AdminNavBar";
// import type { Journal } from "../services/journal.service";

export default function Profile() {

  // const { user, setUser } = useAuth()
  const { user } = useAuth()
  const navigate = useNavigate()
  // const [isEditOpen, setIsEditOpen] = useState(false);
   const { journals, loading } = useJournal();
   const [weeklyProfile, setWeeklyProfile] = useState({ mostFrequentMood: 'None', journalEntries: 0 });

  useEffect(() => {
    if (!loading && journals.length > 0) {
      setWeeklyProfile(getWeeklySummaryForProfile(journals));
    }
  }, [loading, journals]);

  // useEffect(() => {
  //   console.log("USER OBJECT 👉", user);
  //   console.log("USER ROLE 👉", user?.role);
  // }, [user]);

  // const handleLogout = () => {
  //   setUser(null)
  //   localStorage.removeItem("accessToken")
  //   localStorage.removeItem("refreshToken")
  //   navigate("/login")
  // }


  // ================================
  // PAGE WRAPPER
  // ================================
  return (
    <div id="profile-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">

      {/* GLOBAL FONTS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      {/* TOP NAVBAR */}
      {/* <NavBar /> */}
      {user?.roles?.includes("admin")
        ? <AdminNavBar /> : <NavBar />
      }

      {/* MAIN CONTENT */}
      <div id="profile-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* PROFILE HEADER */}
        <div id="profile-header" className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white overflow-hidden">
              {user?.imgUrl ? (
                <img
                  src={user.imgUrl}
                  alt={`${user?.firstname || ""} ${user?.lastname || ""}`}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "";
                  }}
                />
              ) : (
                <span>
                  {`${user?.firstname?.charAt(0) || ""}${user?.lastname?.charAt(0) || ""}`.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{user?.firstname} {user?.lastname}</h1>
          <p className="text-lg text-gray-600 mb-1">{user?.email}</p>
          <p className="text-sm text-gray-500">Your personal wellness space</p>
        </div>

        {/* PROFILE DETAILS */}
        <div id="profile-details" className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Profile Details</h2>
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Edit Profile
            </button>
            {/* <>
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setIsEditOpen(true)}
              >Edit Profile</button>
              <EditProfileModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
              />
            </> */}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Username</p>
              <p className="text-lg text-gray-900">{user?.firstname} {user?.lastname}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Account Created</p>
              <p className="text-lg text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
            {/* Total Journal Entries */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Total Journal Entries</p>
              <p className="text-lg text-gray-900">
                {weeklyProfile.journalEntries} entries
              </p>
            </div>

            {/* Most Frequent Mood */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Most Frequent Mood</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{weeklyProfile.mostFrequentMood}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PREFERENCES */}
        <div id="profile-preferences" className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preferences</h2>
          <div className="space-y-4">

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* AI Tips Notifications */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200">
              <div>
                <p className="font-medium text-gray-900">AI Tips Notifications</p>
                <p className="text-sm text-gray-600">Receive daily wellness tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Weekly Mood Reports */}
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200">
              <div>
                <p className="font-medium text-gray-900">Weekly Mood Reports</p>
                <p className="text-sm text-gray-600">Get weekly analytics summary</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

          </div>
        </div>

        {/* DANGER ZONE */}
        <div id="profile-danger-zone" className="bg-red-50 border-2 border-red-200 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Danger Zone</h2>
          <p className="text-gray-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 hover:shadow-xl transition-all duration-300">
            Delete Account
          </button>
          <p className="text-xs text-red-600 mt-2">⚠️ This action is irreversible.</p>
        </div>

        {/* LOG OUT */}
        {/* <div id="profile-logout" className="text-center">
          <button
            onClick={handleLogout}
            className="bg-white text-gray-700 border-2 border-gray-300 px-10 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
            Log Out
          </button>
        </div> */}

      </div>
    </div>
  );
}
// function useEffect(arg0: () => void, arg1: (boolean | Journal[])[]) {
//   throw new Error("Function not implemented.");
// }

