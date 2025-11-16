import { create } from "zustand";

interface Member {
  id: string;
  name: string;
  studentId: string;
  major: string;
}

interface MemberState {
  members: Member[];
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  members: [],

  setMembers: (members) => set({ members }),
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),
}));
