import { useState } from "react";
import NavBar from "../components/NavBar";

export default function AIAssistant() {

  // ================================
  // STATE MANAGEMENT
  // ================================
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I'm your AI wellness assistant. How can I support you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ================================
  // MESSAGE SENDER FUNCTION
  // ================================
  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: input }]);

    const userMsg = input;
    setInput("");
    setLoading(true); // START loading

    try {
      const res = await fetch("http://localhost:5000/api/v1/mindecho/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg })  // <-- key must be "question"
      });

      const data = await res.json();

      setMessages(prev => [...prev, { type: "ai", text: data.answer }]); // <-- response key is "answer"

    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { type: "ai", text: "⚠ Unable to connect to AI server." }
      ]);
    }finally {
      setLoading(false); // STOP loading
    }
  };
  
  return (
    <div id="ai-assistant-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">

      {/* GLOBAL FONTS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      {/* TOP NAVIGATION */}
      <NavBar />

      <div id="page-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* TITLE SECTION */}
        <div id="title-section" className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Wellness Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Ask anything. Get mindful, calming responses.
          </p>
        </div>

        {/* CHAT BOX WRAPPER */}
        <div 
          id="chat-container"
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
          style={{ height: '70vh' }}
        >
          <div className="flex flex-col h-full">

            {/* CHAT MESSAGES */}
            <div id="messages-section" className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-6 py-4 rounded-2xl shadow-md ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-br-none'
                        : 'bg-gradient-to-r from-purple-200 to-purple-300 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm md:text-base whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Typing Bubble */}
            {loading && (
              <div className="flex justify-start animate-fadeIn mb-2">
                <div className="max-w-xs md:max-w-md px-6 py-4 rounded-2xl shadow-md bg-purple-200 text-gray-800 rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="dot animate-dot"></span>
                    <span className="dot animate-dot delay-200"></span>
                    <span className="dot animate-dot delay-400"></span>
                  </div>
                </div>
              </div>
            )}

            {/* INPUT SECTION */}
            <div id="input-section" className="border-t border-gray-200 p-4 bg-white/90">
              <div className="flex gap-3">

                <input
                  id="message-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Type your question..."
                />

                <button
                  id="send-button"
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Send
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* SUGGESTED QUESTIONS */}
        <div id="suggestion-box" className="mt-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Try asking:</h3>
          <div className="space-y-3">

            <button
              id="suggestion-1"
              onClick={() => setInput("How can I calm my mind today?")}
              className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 text-gray-700"
            >
              • "How can I calm my mind today?"
            </button>

            <button
              id="suggestion-2"
              onClick={() => setInput("Give me a motivational thought.")}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-gray-700"
            >
              • "Give me a motivational thought."
            </button>

            <button
              id="suggestion-3"
              onClick={() => setInput("Help me understand my mood.")}
              className="w-full text-left px-4 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200 text-gray-700"
            >
              • "Help me understand my mood."
            </button>

          </div>
        </div>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background-color: #4f46e5; /* Indigo-700 or your bubble color */
          border-radius: 50%;
          display: inline-block;
          opacity: 0.3;
        }

        .animate-dot {
          animation: bounce 1s infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}
