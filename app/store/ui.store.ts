import { create } from "zustand";

interface UIState {
  loading: boolean;
  modal: {
    type: "success" | "error" | "info";
    title: string;
    message: string;
    onConfirm?: () => void;
  } | null;

  setLoading: (value: boolean) => void;
  openModal: (modal: UIState["modal"]) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  modal: null,

  setLoading: (value) => set({ loading: value }),
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));
