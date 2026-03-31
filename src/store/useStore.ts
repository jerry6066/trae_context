import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  currentLanguage: string;
  level: string;
  points: number;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateLanguage: (lang: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: '1',
    name: '学习者',
    email: 'user@example.com',
    currentLanguage: 'en',
    level: 'B1',
    points: 1250,
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateLanguage: (lang) => set((state) => ({ 
    user: state.user ? { ...state.user, currentLanguage: lang } : null 
  })),
}));
