import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userProfileRouter = router({
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.userProfile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        displayImage: z.string().nullish(),
        username: z.string(),
        bio: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.userProfile.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          displayImage: input.displayImage,
          username: input.username,
          bio: input.bio,
        },
      });
    }),
});
