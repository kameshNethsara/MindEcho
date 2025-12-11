import { useState } from "react";

interface Mood {
  emoji: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  { emoji: "😊", label: "Happy", color: "yellow" },
  { emoji: "😐", label: "Neutral", color: "blue" },
  { emoji: "😢", label: "Sad", color: "purple" },
  { emoji: "😡", label: "Angry", color: "red" },
  { emoji: "😍", label: "Love", color: "pink" },
  { emoji: "😱", label: "Surprised", color: "teal" },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string>("");

  return (
    <section id="mood-selector" className="py-16 mood-section">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          How are you feeling today?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`
                flex flex-col items-center space-y-2 p-6 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg
                ${selectedMood === mood.label ? "ring-4 ring-purple-400" : `bg-${mood.color}-100 hover:bg-${mood.color}-200`}
              `}
            >
              <span className="text-5xl">{mood.emoji}</span>
              <span className="font-medium text-gray-700">{mood.label}</span>
            </button>
          ))}
        </div>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 mb-4"
          rows={4}
          placeholder="Write about your day..."
        ></textarea>
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
          Submit Entry
        </button>
      </div>
    </section>
  );
}
