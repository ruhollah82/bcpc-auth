import { create } from "zustand";

interface Team {
  id: string;
  name: string;
  university: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  members: string[];
}

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;

  // --- فیلدهای فرم تیم ---
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  university: string;
  members: string[];

  // --- اکشن‌ها ---
  setLeader: (data: { name?: string; email?: string; phone?: string }) => void;

  setUniversity: (uni: string) => void;

  addMember: () => void;
  updateMember: (index: number, name: string) => void;
  removeMember: (index: number) => void;

  resetTeamForm: () => void;

  // مدیریت تیم‌ها
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  selectTeam: (teamId: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  // لیست تیم‌ها
  teams: [],
  selectedTeam: null,

  // اطلاعات فرم
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",
  university: "",
  members: [],

  // اکشن‌های فرم
  setLeader: ({ name, email, phone }) =>
    set((state) => ({
      leaderName: name ?? state.leaderName,
      leaderEmail: email ?? state.leaderEmail,
      leaderPhone: phone ?? state.leaderPhone,
    })),

  setUniversity: (uni) => set({ university: uni }),

  addMember: () =>
    set((state) => {
      if (state.members.length >= 2) return state; // حداکثر ۲ عضو
      return { members: [...state.members, ""] };
    }),

  updateMember: (index, name) =>
    set((state) => {
      const updated = [...state.members];
      updated[index] = name;
      return { members: updated };
    }),

  removeMember: (index) =>
    set((state) => {
      const updated = [...state.members];
      updated.splice(index, 1);
      return { members: updated };
    }),

  resetTeamForm: () =>
    set({
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      university: "",
      members: [],
    }),

  // مدیریت تیم‌ها
  setTeams: (teams) => set({ teams }),

  addTeam: (team) =>
    set((state) => ({
      teams: [...state.teams, team],
    })),

  selectTeam: (teamId) =>
    set((state) => ({
      selectedTeam: state.teams.find((t) => t.id === teamId) || null,
    })),
}));
