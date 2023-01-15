import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { isValidUsername } from "../../../utils/usernameChecker";

export const userProfileRouter = router({
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.userProfile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        links: true,
      },
    });
  }),
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        displayImage: z.string().nullish(),
        title: z.string(),
        username: z.string(),
        bio: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUsersWithSameUsername =
        await ctx.prisma.userProfile.findMany({
          where: {
            username: input.username,
            AND: {
              NOT: {
                userId: ctx.session.user.id,
              },
            },
          },
        });
      if (existingUsersWithSameUsername.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username is already taken, choose another.",
          cause: "Duplicate username",
        });
      }
      if (!isValidUsername(input.username)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Username violates our acceptable usernames, choose another.",
          cause: "Acceptable username violation",
        });
      }
      await ctx.prisma.userProfile.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          displayImage: input.displayImage,
          title: input.title,
          username: input.username,
          bio: input.bio,
        },
      });
    }),
});
