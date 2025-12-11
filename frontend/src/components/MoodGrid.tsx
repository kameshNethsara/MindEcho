import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Mood {
  id: string;
  emoji: string;
  label: string;
  bg: string;
  hoverBg: string;
}

interface MoodGridProps {
  moods: Mood[];
  safe: (emoji: string) => number;
  itemsPerBatch?: number; // how many items appear per batch
  batchDelay?: number; // delay in seconds between batches
}

export default function MoodGrid({
  moods,
  safe,
  itemsPerBatch = 4,
  batchDelay = 1,
}: MoodGridProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev + itemsPerBatch;
        return next > moods.length ? moods.length : next; // stop at max
      });
    }, batchDelay * 1000);

    return () => clearInterval(interval);
  }, [moods.length, itemsPerBatch, batchDelay]);

  const visibleMoods = moods.slice(0, visibleCount);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {visibleMoods.map((mood) => (
        <motion.div
          key={mood.id}
          initial="hidden"
          animate="show"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.08 }}
          className={`text-center p-4 rounded-lg shadow-md cursor-pointer ${mood.bg} ${mood.hoverBg}`}
        >
          <p className="text-3xl font-bold">{safe(mood.emoji)}</p>
          <p className="text-sm text-gray-600 mt-1">{mood.label} Days</p>
          <p className="text-xs text-gray-400 mt-1">{mood.emoji}</p>    
        </motion.div>
      ))}
    </div>
  );
}
