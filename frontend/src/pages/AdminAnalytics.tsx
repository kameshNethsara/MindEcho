import { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { getAllJournalsAdmin, type Journal } from "../services/journal.service";

function AdminAnalytics() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all journals for admin
  const fetchJournals = async () => {
    try {
      setLoading(true);
      const res = await getAllJournalsAdmin();
      setJournals(res.data);
    } catch (err) {
      console.error("Failed to load journals", err);
      setJournals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // 📊 Analytics
  const totalJournals = journals.length;

  const moodCount: Record<string, number> = {};
  let aiSummaryCount = 0;
  let aiSuggestionCount = 0;

  journals.forEach((j) => {
    moodCount[j.moodEmoji] = (moodCount[j.moodEmoji] || 0) + 1;
    if (j.aiSummary) aiSummaryCount++;
    if (j.aiSuggestion) aiSuggestionCount++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero Header */}
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Analytics Dashboard
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Emotional Insights
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
            Platform-wide emotional trends, AI summaries, and mental wellness analytics
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <StatCard title="Total Journals" value={totalJournals} icon="📓" />
          <StatCard title="AI Summaries" value={aiSummaryCount} icon="🧠" />
          <StatCard title="AI Suggestions" value={aiSuggestionCount} icon="✨" />
        </section>

        {/* Mood Analytics */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Mood Distribution
          </h2>

          {Object.keys(moodCount).length === 0 ? (
            <p className="text-gray-500 text-lg">No mood data available</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(moodCount).map(([mood, count]) => (
                <div
                  key={mood}
                  className="flex flex-col items-center bg-purple-50 rounded-3xl p-8 shadow"
                >
                  <span className="text-5xl mb-3">{mood}</span>
                  <span className="text-3xl font-bold text-gray-800">
                    {count}
                  </span>
                  <span className="text-base text-gray-500">Entries</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Journals */}
        <section className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Latest Journals
          </h2>

          {loading ? (
            <p className="text-gray-500 text-lg">Loading journals...</p>
          ) : journals.length === 0 ? (
            <p className="text-gray-500 text-lg">No journals found</p>
          ) : (
            <div className="space-y-6">
              {journals.slice(0, 5).map((j) => (
                <div
                  key={j._id}
                  className="border border-gray-200 rounded-2xl p-6 hover:bg-purple-50 transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl">{j.moodEmoji}</span>
                    <span className="text-sm text-gray-500">
                      {/* date | username */}
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg line-clamp-2">
                    {j.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default AdminAnalytics;

/* ---------- Stat Card ---------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 flex items-center gap-6">
      <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-3xl">
        {icon}
      </div>
      <div>
        <p className="text-base text-gray-500 font-medium">{title}</p>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
