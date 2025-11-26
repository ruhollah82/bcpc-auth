import { api } from "../lib/axios";

export const TeamService = {
  createTeam: async (data: {
    teamname: string;
    descriptions: string;
    organization_id: string;
    email: string;
    phoneNumber: string;
    users: string[];
  }) => {
    const res = await api.post("/teams", data);
    return res.data;
  },

  getTeams: async () => {
    const res = await api.get("/teams");
    return res.data;
  },
};
