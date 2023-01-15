import { router } from "../trpc";
import { linksRouter } from "./links";
import { userProfileRouter } from "./userProfile";

export const appRouter = router({
  links: linksRouter,
  userProfile: userProfileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
