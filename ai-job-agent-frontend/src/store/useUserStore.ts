import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  token: string | null;
  user: any | null;
  resumeText: string;
  skills: string[];
  setAuth: (token: string, user: any) => void;
  logout: () => void;
  setResumeText: (text: string) => void;
  setSkills: (skills: string[]) => void;
  setResumeData: (skills: string[], text: string) => void;
  addSkill: (skill: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      resumeText: '',
      skills: [],
      
      setAuth: (token, user) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        set({ token, user });
      },
      
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({ token: null, user: null });
      },

      setResumeText: (text: string) => set({ resumeText: text }),
      setSkills: (skills: string[]) => set({ skills }),
      setResumeData: (skills: string[], text: string) => set({ skills, resumeText: text }),
      addSkill: (skill: string) =>
        set((state) => ({
          skills: state.skills.includes(skill)
            ? state.skills
            : [...state.skills, skill],
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);