import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const tweetRouter = createTRPCRouter({
    create: protectedProcedure
    .input(tweetSchema)
    .mutation(({ctx, input})=>{
        const { prisma } = ctx;
        const { text } = input;
        const userId = session.user.id;
        return prisma.tweet.create({
            data:{
                text,
                author: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })
    })
})
