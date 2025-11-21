import { Link } from "react-router-dom";
import FloatingLeaves from "../components/FloatingLeaves";

export default function Index() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* 🌿 Floating leaves in the background */}
      <FloatingLeaves />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Google Fonts */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * { font-family: 'Poppins', sans-serif; }
          `}
        </style>

        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindEcho
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                  Home
                </Link>
                {/* <Link to="/features" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                  Features
                </Link> */}
                <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                  Features
                </a>
                <a href="#why-mindecho" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                  About
                </a>
                <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Echo Your Mind.{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Heal Your Day.
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                AI-powered mood tracking & emotional wellness support.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 rounded-3xl h-96 flex items-center justify-center shadow-xl">
              <span className="text-purple-600 font-medium">Illustration Placeholder</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="features">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Features Built for Your Wellness
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mood Tracking</h3>
              <p className="text-gray-600">
                Advanced AI emotion detection helps you understand your feelings and patterns over time.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Daily Insights</h3>
              <p className="text-gray-600">
                Receive personalized AI wellness tips and recommendations tailored to your emotional state.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure Journal</h3>
              <p className="text-gray-600">
                Your thoughts are protected with private encrypted entries. Your privacy is our priority.
              </p>
            </div>
          </div>
        </section>

        {/* Why MindEcho Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="why-mindecho">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose MindEcho?
          </h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Intelligence</h3>
                <p className="text-gray-600">
                  Our advanced AI understands your emotional patterns and provides meaningful insights to support your mental health journey.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  End-to-end encryption ensures your personal thoughts and data remain completely private and secure.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Accessible</h3>
                <p className="text-gray-600">
                  Access your wellness companion anywhere, anytime. MindEcho is available across all your devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="cta">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start your wellness journey today.
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of people improving their mental health with MindEcho.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600">
              © 2025 MindEcho. Empowering emotional wellness through AI.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
