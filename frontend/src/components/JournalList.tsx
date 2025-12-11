// import React, { useEffect, useState } from "react";
// import { getJournals, deleteJournal } from "../services/journal.service";
// import type { Journal } from "../services/journal.service";

// const JournalList: React.FC = () => {
//   const [journals, setJournals] = useState<Journal[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchJournals = async () => {
//     setLoading(true);
//     try {
//       const res = await getJournals(1, 10); // page 1, limit 10
//       setJournals(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;
//     try {
//       await deleteJournal(id);
//       fetchJournals(); // refresh list
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchJournals();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="space-y-4">
//       {journals.map((j) => (
//         <div
//           key={j._id}
//           className="p-4 border rounded-xl shadow-sm flex justify-between items-center"
//         >
//           <div>
//             <div className="text-2xl">{j.moodEmoji}</div>
//             <div>{j.text}</div>
//             {j.aiSummary && <div className="text-sm text-gray-500">AI: {j.aiSummary}</div>}
//             {j.aiSuggestion && (
//               <div className="text-sm text-green-600">Tip: {j.aiSuggestion}</div>
//             )}
//           </div>
//           <button
//             onClick={() => handleDelete(j._id)}
//             className="text-red-500 font-bold hover:underline"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JournalList;

import React, { useEffect, useState } from "react";
import { getJournals } from "../services/journal.service";
import type { Journal } from "../services/journal.service";

const JournalList: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await getJournals(1, 3); // page 1, limit 3 to get only recent 3
      setJournals(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (journals.length === 0)
    return (
      <div className="text-center py-10 text-gray-400 italic">
        🌱 No recent entries yet. Start journaling today!
      </div>
    );

  return (
    <div className="space-y-4">
      {journals.map((j) => (
        <div
          key={j._id}
          className="p-4 border rounded-xl shadow-sm flex flex-col space-y-2"
        >
            <div className="text-2xl">{j.moodEmoji}</div>
                
            <div>{j.text}</div>
            {j.aiSummary && <div className="text-sm text-gray-500">AI: {j.aiSummary}</div>}
            {j.aiSuggestion && (<div className="text-sm text-green-600">Tip: {j.aiSuggestion}</div>)}
    
            <div className="text-sm text-gray-500 italic mt-1">
                {new Date(j.createdAt).toLocaleDateString()}{" "} 
                {new Date(j.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
      ))}
    </div>
  );
};

export default JournalList;

