import API from "../services/api.service";
// import { getMyDetails } from "./auth.service";

export interface Journal {
  _id: string;
  userId: string;
  moodEmoji: string;
  text: string;
  aiSummary: string;
  aiSuggestion: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export const createJournal = async (data: { moodEmoji: string; text: string }) => {
  try {
    // FRONTEND DOES NOT SEND userId ANYMORE
    const response = await API.post("/journals/create-journal", data);
    return response.data;
  } catch (err: any) {
    console.error("Error creating journal:", err.response?.data || err.message);
    throw err;
  }
};

export const getJournals = async (page = 1, limit = 10) => {
  const response = await API.get(`/journals/get-journals?page=${page}&limit=${limit}`);
  return response.data;
};

export const getJournalById = async (id: string) => {
  const response = await API.get(`/journals/get-selected-journal/${id}`);
  return response.data;
};

export const deleteJournal = async (id: string) => {
  const response = await API.delete(`/journals/delete-journal/${id}`);
  return response.data;
};
