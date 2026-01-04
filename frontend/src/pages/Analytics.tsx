import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
// import { useMemo } from "react";
import { useJournal } from "../context/JournalContext";
// import {
//   getMoodCounts,
//   getWeeklySummary,
//   getMonthlySummary,
//   calculateMoodScore
// } from "../utils/analyticsUtils";
import { useAnalytics } from "../context/AnalyticsContext";
import MoodGrid from "../components/MoodGrid";
import MoodBarChart from "../components/MoodBarChart";
import { moods } from '../constants/moods';

export default function Analytics() {
  // const { journals, loading } = useJournal();

  // // Derived analytics (memoized)
  // const moodCounts = useMemo(() => getMoodCounts(journals), [journals]);
  // const weekly = useMemo(() => getWeeklySummary(journals), [journals]);
  // const monthlyCounts = useMemo(() => getMonthlySummary(journals), [journals]);
  // const avgMoodScore = useMemo(() => calculateMoodScore(journals), [journals]);

  // // Helper: safe getter
  // const safe = (emoji: string) => monthlyCounts[emoji] || 0;

   const {
    moodCounts,
    weekly,
    monthlyCounts,
    avgMoodScore,
    // isReady
  } = useAnalytics();

  const { journals, loading } = useJournal();

  // if (!isReady) {
  //   return (
  //     <div className="text-center py-16 text-gray-500">
  //       Loading analytics or no data yet...
  //     </div>
  //   );
  // }

  const safe = (emoji: string) => monthlyCounts[emoji] || 0;

  //   const moods = [
  //   { id: "happy", emoji: "😊", label: "Happy", bg: "bg-yellow-100", hoverBg: "hover:bg-yellow-200" },
  //   { id: "calm", emoji: "😌", label: "Calm", bg: "bg-green-100", hoverBg: "hover:bg-green-200" },
  //   { id: "neutral", emoji: "😐", label: "Neutral", bg: "bg-blue-100", hoverBg: "hover:bg-blue-200" },
  //   { id: "anxious", emoji: "😰", label: "Anxious", bg: "bg-orange-100", hoverBg: "hover:bg-orange-200" },
  //   { id: "sad", emoji: "😢", label: "Sad", bg: "bg-purple-100", hoverBg: "hover:bg-purple-200" },
  //   { id: "angry", emoji: "😠", label: "Angry", bg: "bg-red-100", hoverBg: "hover:bg-red-200" },
  //   { id: "excited", emoji: "🤩", label: "Excited", bg: "bg-pink-100", hoverBg: "hover:bg-pink-200" },
  //   { id: "nervous", emoji: "😬", label: "Nervous", bg: "bg-orange-50", hoverBg: "hover:bg-orange-100" },
  //   { id: "confident", emoji: "😎", label: "Confident", bg: "bg-indigo-100", hoverBg: "hover:bg-indigo-200" },
  //   { id: "flirty", emoji: "😉", label: "Flirty", bg: "bg-rose-100", hoverBg: "hover:bg-rose-200" },
  //   { id: "serious", emoji: "🤨", label: "Serious", bg: "bg-gray-100", hoverBg: "hover:bg-gray-200" },
  //   { id: "creative", emoji: "🎨", label: "Creative", bg: "bg-teal-100", hoverBg: "hover:bg-teal-200" },
  // ];

  return (
    <div id="analytics-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">

      {/* GLOBAL FONTS */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>

      {/* TOP NAVBAR */}
      <NavBar />

      {/* MAIN CONTENT */}
      <div id="analytics-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TITLE */}
        <div id="analytics-title" className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Mood Analytics</h1>
          <p className="text-xl text-gray-600">Track your emotional patterns and progress</p>
        </div>

        {/* LOADING / NO DATA */}
        {loading ? (
          <div className="text-center py-16">Loading analytics...</div>
        ) : journals.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            🌱 No journal entries yet. Add entries first to see analytics.
          </div>
        ) : (
          <>
            {/* CARDS GRID */}
            <div id="analytics-cards-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {/* Mood Trends Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mood Trends</h2>
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {/* show top 3 moods as simple text summary */}
                    Top moods: {Object.entries(moodCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([emoji, count]) => `${emoji} (${count})`)
                      .join(" • ")}
                  </span>
                </div>
              </div>

              {/* Emotions Breakdown Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Emotions Breakdown</h2>
                <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-blue-600 font-medium">{Object.keys(moodCounts).length} unique moods recorded</p>
                    <div className="mt-3 text-sm text-gray-700">
                      {Object.entries(moodCounts).map(([emoji, count]) => (
                        <div key={emoji} className="inline-block mr-3">
                          <span className="mr-1">{emoji}</span>
                          <span className="text-xs text-gray-600">x{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Summary Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Weekly Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Most Frequent Mood</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{weekly.mostFrequentMood}</span>
                      <span className="text-gray-900 font-semibold">{weekly.mostFrequentMood ? " " : "None"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Average Mood Score</span>
                    <span className="text-gray-900 font-semibold">{avgMoodScore} / 10</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Journal Entries (7 days)</span>
                    <span className="text-gray-900 font-semibold">{weekly.journalEntries} entries</span>
                  </div>
                </div>
              </div>

              {/* AI Insights Card */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Insights</h2>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Your emotional pattern shows calmness with slight fluctuations. Consider journaling when you feel stressed. You tend to feel happier in the mornings and more relaxed in the evenings. Keep up the great work with your wellness journey!
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-2xl">💡</span>
                    <span className="text-sm text-purple-600 font-medium">AI-Powered Analysis</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Monthly Mood Overview */}
            <div id="monthly-overview" className="bg-white rounded-xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Monthly Mood Overview</h2>
              <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-xl h-80 flex items-center justify-center">
                {/* <span className="text-purple-600 font-medium text-lg">Bar Chart Placeholder</span> */}
                <MoodBarChart moods={moods} safe={safe} />
                {/* <MoodBarChart
                  moods={moods}
                  journals={journals.map(j => ({
                    mood: j.moodEmoji,        // correct field
                    createdAt: j.createdAt
                  }))}
                /> */}
              </div>

            {/* 
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

                <div id="happy-days" className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{safe("😊")}</p>
                  <p className="text-sm text-gray-600 mt-1">Happy Days</p>
                </div>

                <div id="calm-days" className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{safe("😌")}</p>
                  <p className="text-sm text-gray-600 mt-1">Calm Days</p>
                </div>

                <div id="neutral-days" className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">{safe("😐")}</p>
                  <p className="text-sm text-gray-600 mt-1">Neutral Days</p>
                </div>

                <div id="stressed-days" className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-3xl font-bold text-indigo-600">{safe("😰")}</p>
                  <p className="text-sm text-gray-600 mt-1">Stressed Days</p>
                </div>

              </div> */}
              {/* <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {moods.map((mood) => (
                  <div
                    key={mood.id}
                    className={`text-center p-4 rounded-lg ${mood.bg}`}
                  >
                    <p className="text-3xl font-bold">
                      {safe(mood.emoji)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {mood.label} Days
                    </p>
                  </div>
                ))}
              </div> */}
              <div>
                <MoodGrid moods={moods} safe={safe}/>
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div id="cta-section" className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want deeper wellness tips?</h2>
          <p className="text-purple-100 mb-6 text-lg">Our AI assistant can provide personalized recommendations based on your mood patterns</p>
          <Link id="ai-assistant-link" to="/ai-assistant" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Ask the AI Assistant
          </Link>
        </div>

      </div>
    </div>
  );
}
