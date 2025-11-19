import { create } from "zustand";

interface Team {
  id: string;
  name: string;
  university: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  members: string[];
  descriptionsteam?: string; // ⭐ اضافه شد
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

  // ⭐ فیلدهای جدید از فرم TeamInfoStep
  teamname: string;
  descriptionsteam: string;

  // --- اکشن‌ها ---
  setLeader: (data: { name?: string; email?: string; phone?: string }) => void;

  setUniversity: (uni: string) => void;

  addMember: () => void;
  updateMember: (index: number, name: string) => void;
  removeMember: (index: number) => void;

  // ⭐ اکشن‌های جدید
  setTeamName: (name: string) => void;
  setTeamDescription: (desc: string) => void;

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

  // ⭐ فیلدهای جدید فرم TeamInfoStep
  teamname: "",
  descriptionsteam: "",

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
      if (state.members.length >= 2) return state;
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

  // ⭐ اکشن جدید: نام تیم
  setTeamName: (name) => set({ teamname: name }),

  // ⭐ اکشن جدید: شعار تیم
  setTeamDescription: (desc) => set({ descriptionsteam: desc }),

  resetTeamForm: () =>
    set({
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      university: "",
      members: [],
      teamname: "",
      descriptionsteam: "",
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
