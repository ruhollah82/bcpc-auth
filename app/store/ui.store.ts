import { create } from "zustand";

interface UIState {
  loading: boolean;
  modal: string | null;

  setLoading: (value: boolean) => void;
  openModal: (name: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  modal: null,

  setLoading: (value) => set({ loading: value }),
  openModal: (name) => set({ modal: name }),
  closeModal: () => set({ modal: null }),
}));
