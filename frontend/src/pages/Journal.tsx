// import { useEffect, useState } from "react";
// import NavBar from "../components/NavBar";
// import Swal from "sweetalert2";
// import {
//   createJournal,
//   getJournals,
//   deleteJournal,
//   type Journal as JournalType,
// } from "../services/journal.service";

// export default function Journal() {
//   const [selectedMood, setSelectedMood] = useState<string>("");
//   const [text, setText] = useState("");
//   const [journals, setJournals] = useState<JournalType[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch journals
//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await getJournals(1, 10);
//       setJournals(res.data);
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to load journals.", "error");
//     }
//     setLoading(false);
//   };

//   // Add new journal entry
//   const handleAddEntry = async () => {
//     if (!selectedMood || !text) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Please select a mood and write your journal text.",
//       });
//       return;
//     }

//     try {
//       await createJournal({
//         moodEmoji: selectedMood,
//         text: text,
//       });

//       await Swal.fire({
//         icon: "success",
//         title: "Journal Added!",
//         text: "Your journal entry was successfully created.",
//         timer: 1200,
//         showConfirmButton: false,
//       });

//       fetchJournals();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to create journal entry.", "error");
//     }
//   };

//   // Delete entry
//   const handleDelete = async (id: string) => {
//     const { isConfirmed } = await Swal.fire({
//       title: "Are you sure?",
//       text: "This entry will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!isConfirmed) return;

//     try {
//       await deleteJournal(id);

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Your journal entry has been removed.",
//         timer: 1200,
//         showConfirmButton: false,
//       });

//       fetchJournals();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to delete journal.", "error");
//     }
//   };

//   useEffect(() => {
//     fetchJournals();
//   }, []);

//   const moods = [
//     { id: "happy", emoji: "😊", label: "Happy", bg: "bg-yellow-100", hoverBg: "hover:bg-yellow-200" },
//     { id: "calm", emoji: "😌", label: "Calm", bg: "bg-green-100", hoverBg: "hover:bg-green-200" },
//     { id: "neutral", emoji: "😐", label: "Neutral", bg: "bg-blue-100", hoverBg: "hover:bg-blue-200" },
//     { id: "anxious", emoji: "😰", label: "Anxious", bg: "bg-orange-100", hoverBg: "hover:bg-orange-200" },
//     { id: "sad", emoji: "😢", label: "Sad", bg: "bg-purple-100", hoverBg: "hover:bg-purple-200" },
//     { id: "angry", emoji: "😠", label: "Angry", bg: "bg-red-100", hoverBg: "hover:bg-red-200" },
//     { id: "excited", emoji: "🤩", label: "Excited", bg: "bg-pink-100", hoverBg: "hover:bg-pink-200" },
//     { id: "nervous", emoji: "😬", label: "Nervous", bg: "bg-orange-50", hoverBg: "hover:bg-orange-100" },
//     { id: "confident", emoji: "😎", label: "Confident", bg: "bg-indigo-100", hoverBg: "hover:bg-indigo-200" },
//     { id: "flirty", emoji: "😉", label: "Flirty", bg: "bg-rose-100", hoverBg: "hover:bg-rose-200" },
//     { id: "serious", emoji: "🤨", label: "Serious", bg: "bg-gray-100", hoverBg: "hover:bg-gray-200" },
//     { id: "creative", emoji: "🎨", label: "Creative", bg: "bg-teal-100", hoverBg: "hover:bg-teal-200" },
//   ];

//   return (
//     <div id="journal-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       {/* GLOBAL FONTS */}
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//           * { font-family: 'Poppins', sans-serif; }
//         `}
//       </style>

//       {/* NAVBAR */}
//       <NavBar />

//       {/* MAIN CONTENT */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         {/* TITLE */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Mood Journal</h1>
//           <p className="text-xl text-gray-600">Track your emotions and write your thoughts</p>
//         </div>

//         {/* ADD ENTRY CARD */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Entry</h2>

//           {/* Mood Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-4">How are you feeling?</label>
//             <div className="grid grid-cols-6 gap-4">
//               {moods.map((mood) => (
//                 <button
//                   key={mood.id}
//                   className={`flex flex-col items-center space-y-2 p-4 ${mood.bg} ${mood.hoverBg} rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${selectedMood === mood.emoji ? "ring-4 ring-purple-400" : ""}`}
//                   onClick={() => setSelectedMood(mood.emoji)}
//                 >
//                   <span className="text-4xl">{mood.emoji}</span>
//                   <span className="text-sm font-medium text-gray-700">{mood.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Text Area */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Write about your day</label>
//             <textarea
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//               rows={6}
//               placeholder="Today I felt... because..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             ></textarea>
//           </div>

//           {/* Add Entry Button */}
//           <button
//             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
//             onClick={handleAddEntry}
//           >
//             Add Entry
//           </button>
//         </div>

//         {/* RECENT ENTRIES */}
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Entries</h2>
//           {loading ? (
//             <div>Loading...</div>
//           ) : journals.length === 0 ? (
//             <div className="text-center py-10 text-gray-400 italic">
//               🌱 No recent entries yet. Start journaling today!
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {journals.map((j) => (
//                 <div key={j._id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-4">
//                       <span className="text-4xl">{j.moodEmoji}</span>
//                       <div>
//                         <p className="text-sm text-gray-500">{new Date(j.createdAt).toLocaleString()}</p>
//                         <span className="inline-block mt-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-medium">
//                           {j.moodEmoji}
//                         </span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(j._id)}
//                       className="text-red-500 font-bold hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-700 mb-4">{j.text}</p>
//                   {j.aiSummary && <div className="text-sm text-gray-500 mb-2">AI: {j.aiSummary}</div>}
//                   {j.aiSuggestion && <div className="text-sm text-green-600">Tip: {j.aiSuggestion}</div>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react"
import NavBar from "../components/NavBar"
import { useJournal } from "../context/JournalContext"
import { moods } from '../constants/moods';

export default function Journal() {
  const { journals, loading, addJournal, removeJournal } = useJournal()
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [text, setText] = useState("")

  
  // const moods = [
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


  const handleAddEntry = async () => {
    if (!selectedMood || !text) return
    await addJournal(selectedMood, text)
    setSelectedMood("")
    setText("")
  }

  return (
    <div id="journal-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* GLOBAL FONTS */}
       <style>
         {`
           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
           * { font-family: 'Poppins', sans-serif; }
         `}
       </style>
      
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Mood Journal</h1>
          <p className="text-xl text-gray-600">Track your emotions and write your thoughts</p>
        </div>

        {/* Add Entry */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Entry</h2>

          {/* Mood Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">How are you feeling?</label>
            <div className="grid grid-cols-6 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  className={`flex flex-col items-center space-y-2 p-4 ${mood.bg} ${mood.hoverBg} rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    selectedMood === mood.emoji ? "ring-4 ring-purple-400" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.emoji)}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Write about your day</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              rows={6}
              placeholder="Today I felt... because..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={handleAddEntry}
          >
            Add Entry
          </button>
        </div>

        {/* Recent Entries */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Entries</h2>

          {loading ? (
            <div>Loading...</div>
          ) : journals.length === 0 ? (
            <div className="text-center py-10 text-gray-400 italic">
              🌱 No recent entries yet. Start journaling today!
            </div>
          ) : (
            <div className="space-y-6">
              {journals.map((j) => (
                <div
                  key={j._id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{j.moodEmoji}</span>
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(j.createdAt).toLocaleDateString()} |{" "}
                          {new Date(j.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>

                        <span className="inline-block mt-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-medium">
                          {j.moodEmoji}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeJournal(j._id)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{j.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

