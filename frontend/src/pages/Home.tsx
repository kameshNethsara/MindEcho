import { } from 'react'
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar'
// import MoodSelector from '../components/MoodSelector';
import JournalList from '../components/JournalList';
import MoodBarChart from "../components/MoodBarChart";
import { moods } from '../constants/moods';
import { useJournal } from "../context/JournalContext";
import { useAnalytics } from "../context/AnalyticsContext";
import RelaxingGif from '../components/RelaxingGif';

export default function Home() {
     const {
      monthlyCounts,
      // isReady
    } = useAnalytics();
  
    useJournal();
  
  //   if (!isReady) {
  //     return (
  //       <div className="text-center py-16 text-gray-500">
  //         Loading analytics or no data yet...
  //       </div>
  //     );
  // }
  
  const safe = (emoji: string) => monthlyCounts[emoji] || 0;

  // GIFs
  const gifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGNmemc3bHJ6MnlwdmJkNnJkcnlzcDZrem5udnN2bmZnZnVsdW12ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4Z65fuphOT7GM/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnc5NGRjd2RnNWVrbmJhdXZodjBqdjJpM3huYjk1cXV3aHU2enYwZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2I6eORkJq67PW/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N3Z3MmttMXlpbnlhNTluY25vM3JnejdqMnJvdnA4YXFod2hucnYybSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Wa0TGmtDvwW3e/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGNrOGRkOTlhdzJlczg5Nm56d2w2dGVjdHBiYXpvamU2OTJlemo5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VWfuBgdqM8jZK/giphy.gif",
  ];

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
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section id="hero" className="py-20 hero-section">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Echo Your Mind.{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Heal Your Day.
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Track your moods, get AI wellness tips, and journal your thoughts.
              </p>
              {/* <Link
                to="/register"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
              </Link> */}
            </div>
            <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 rounded-3xl h-96 flex items-center justify-center shadow-xl">
              {/* <span className="text-purple-600 font-medium">Illustration Placeholder</span> */}
              <RelaxingGif gifs={gifs} interval={8000} className="w-full h-full object-cover rounded-3xl" />
            </div>
          </div>
        </section>

        {/* Mood Selector Section */}
         <section id="mood-selector" className="py-16 mood-section">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              How are you feeling today?
            </h2>
            <p className="text-purple-100 mb-6">
              Select your current mood and add a journal entry to track your day
            </p>
            <Link
              to="/journal"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Select Your Mood
            </Link>
          </div>
        </section>

        {/* Recent Journals Section */}
        <section id="recent-journals" className="py-16 journals-section">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Recent Journals
          </h2>
          <div className="">
            {/* Journal Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {/* <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Nov 20, 2025</span>
                <span className="text-3xl">😊</span>
              </div>
              <p className="text-gray-700">
                Had a great day today! Finished my project and went for a walk in the park. Feeling accomplished and peaceful.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Nov 19, 2025</span>
                <span className="text-3xl">😐</span>
              </div>
              <p className="text-gray-700">
                A regular day. Work was okay, nothing too exciting. Spent the evening reading and relaxing at home.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Nov 18, 2025</span>
                <span className="text-3xl">😢</span>
              </div> */}
              <JournalList/>
              {/* <p className="text-gray-700">
                Feeling a bit down today. Work stress is getting to me. Need to remember to take breaks and practice self-care.
              </p> */}

            </div>
          </div>
        </section>

        {/* Emotional Trends Section */}
        <section id="trends" className="py-16 trends-section">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Your emotional trends at a glance
            </h2>
            <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-xl h-80 flex items-center justify-center">
            {/* <span className="text-purple-600 font-medium text-lg">Bar Chart Placeholder</span> */}
              <MoodBarChart moods={moods} safe={safe} />
            </div>
          </div>
        </section>

        {/* AI Tips Section */}
        <section id="ai-tips" className="py-16 ai-section">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a boost? Ask our AI for tips
            </h2>
            <p className="text-purple-100 mb-6">
              Get personalized wellness recommendations powered by AI
            </p>
            <Link
              to="/ai-assistant"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Open AI Assistant
            </Link>
          </div>
        </section>

        {/* Call-to-Action / Journal Section */}
        <section id="journal-cta" className="py-20 cta-section">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Write down your wellness journey today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of people improving their mental health with MindEcho
            </p>
            <Link
              to="/journal"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Journal
            </Link>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 MindEcho. Empowering emotional wellness through AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
