import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { isValidUsername } from "../../../utils/usernameChecker";
import { Configuration, OpenAIApi } from "openai";

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
  generateBio: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY ?? "",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a public facing bio with a maximum of 20 words and base it on this context: ${input}`,
        max_tokens: 200,
        temperature: 0,
      });

      return response.data;
    }),
});
