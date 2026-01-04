import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface MoodBarChartProps {
  moods: { id: string; emoji: string; label: string }[];
  safe: (emoji: string) => number;
}

export default function MoodBarChart({ moods, safe }: MoodBarChartProps) {
  const data = moods.map((mood) => ({
    name: mood.label,
    emoji: mood.emoji,
    count: safe(mood.emoji),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="emoji" tick={{ fontSize: 18 }} />
        <YAxis allowDecimals={false} />
        <Tooltip formatter={(value: number) => [`${value}`, "Days"]} />
        <Bar dataKey="count" fill="#7c3aed" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// interface MoodBarChartProps {
//   moods: { id: string; emoji: string; label: string }[];
//   journals: { mood: string; createdAt: string }[];
// }

// export default function MoodBarChart({ moods, journals }: MoodBarChartProps) {
//   const getYearlyMoodCount = (emoji: string) => {
//      const currentYear = new Date().getFullYear();
//   return journals.filter(j => j.mood === emoji && new Date(j.createdAt).getFullYear() === currentYear).length;
//   };

//   const data = moods.map(mood => ({
//     name: mood.label,
//     emoji: mood.emoji,
//     count: getYearlyMoodCount(mood.emoji),
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="emoji" tick={{ fontSize: 18 }} />
//         <YAxis allowDecimals={false} />
//         <Tooltip formatter={(value: number) => [`${value}`, "Days"]} />
//         <Bar dataKey="count" fill="#7c3aed" radius={[5, 5, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
