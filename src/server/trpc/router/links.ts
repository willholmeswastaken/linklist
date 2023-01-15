import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const linksRouter = router({
  addLink: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userProfile = await ctx.prisma.userProfile.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          links: true,
        },
      });
      await ctx.prisma.link.create({
        data: {
          url: input.url,
          title: input.title,
          userProfileId: userProfile!.id,
          order:
            userProfile!.links.length > 0 ? userProfile!.links.length - 1 : 0,
        },
      });
    }),
  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string(),
        title: z.string(),
        order: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          url: input.url,
          title: input.title,
          order: input.order,
        },
      });
    }),
  deleteLink: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.delete({
        where: {
          id: input,
        },
      });
    }),
});
