import { api } from "./client";

export const createTeamApi = async (data: any) => {
  const res = await api.post("/teams", data);
  return res.data;
};
