import type { UserProfile, Link } from "@prisma/client";

export type UserProfileWithLinks = UserProfile & {
  links: Link[];
};
