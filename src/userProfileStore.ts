import { create } from "zustand";
import type { UserProfileWithLinks } from "./types/UserProfileWIthLinks";

type UserProfileState = {
  userProfile: UserProfileWithLinks | null;
  setUserProfile: (userProfile: UserProfileWithLinks) => void;
};

export const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set(() => ({ userProfile })),
}));
