import { create } from "zustand";

interface Team {
  id: string;
  name: string;
  university: string;
  members: string[];
}

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;

  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  selectTeam: (teamId: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  selectedTeam: null,

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
