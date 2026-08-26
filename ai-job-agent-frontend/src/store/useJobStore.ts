import { create } from 'zustand';

interface JobState {
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useJobStore = create<JobState>((set) => ({
  searchQuery: '',
  selectedCategory: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));