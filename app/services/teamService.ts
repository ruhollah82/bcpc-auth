import type { TeamResponse } from "~/types/registration.types";
import { api } from "../lib/axios";

export const TeamService = {
  createTeam: async (data: {
    teamname: string;
    descriptions: string;
    organization_id: string;
    email: string;
    phoneNumber: string;
    users: string[];
  }): Promise<TeamResponse> => {
    const res = await api.post("/teams", data);
    return res.data as TeamResponse; // تایپ مشخص شد
  },

  getTeams: async (): Promise<TeamResponse[]> => {
    const res = await api.get("/teams");
    return res.data as TeamResponse[];
  },
};
