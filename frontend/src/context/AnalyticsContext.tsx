import { createContext, useContext, useMemo } from "react";
import { useJournal } from "./JournalContext";
import {
  getMoodCounts,
  getWeeklySummary,
  getMonthlySummary,
  calculateMoodScore
} from "../utils/analyticsUtils";

type AnalyticsContextType = {
  moodCounts: Record<string, number>;
  weekly: ReturnType<typeof getWeeklySummary>;
  monthlyCounts: Record<string, number>;
  avgMoodScore: number;
  isReady: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { journals, loading } = useJournal();

  // ⛔ If journals still loading → analytics should also be "not ready"
  const isReady = !loading && journals.length > 0;

  // Memoized analytics so no unnecessary recalculation
  const moodCounts = useMemo(() => getMoodCounts(journals), [journals]);
  const weekly = useMemo(() => getWeeklySummary(journals), [journals]);
  const monthlyCounts = useMemo(() => getMonthlySummary(journals), [journals]);
  const avgMoodScore = useMemo(() => calculateMoodScore(journals), [journals]);

  return (
    <AnalyticsContext.Provider value={{
      moodCounts,
      weekly,
      monthlyCounts,
      avgMoodScore,
      isReady
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used inside <AnalyticsProvider>");
  }
  return context;
}

export default AnalyticsProvider