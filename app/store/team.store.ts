import { create } from "zustand";

interface Team {
  id: string;
  name: string;
  university: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  members: string[];
  descriptionsteam?: string;
}

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;

  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  university: string;
  members: string[];
  teamname: string;
  descriptionsteam: string;

  setLeader: (data: { name?: string; email?: string; phone?: string }) => void;

  setUniversity: (uni: string) => void;

  addMember: () => void;
  updateMember: (index: number, name: string) => void;
  removeMember: (index: number) => void;

  setTeamName: (name: string) => void;
  setTeamDescription: (desc: string) => void;

  resetTeamForm: () => void;

  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  selectTeam: (teamId: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  selectedTeam: null,
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",
  university: "",
  members: [],
  teamname: "",
  descriptionsteam: "",

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
  setTeamName: (name) => set({ teamname: name }),
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
