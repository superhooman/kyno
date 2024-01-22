import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@src/server/api/trpc';
import { confirmAuth, getProfile, initAuth } from '@src/server/kinokz/auth';

import { clearSession, getSession, setSession } from '../../auth';

const telOrEmail = z.object({ phone: z.string().length(11) }).or(z.object({ email: z.string().email() }));

export const authRouter = createTRPCRouter({
    signIn: publicProcedure
        .input(telOrEmail)
        .mutation(async ({ input }) => await initAuth(input)),
    signInWithCode: publicProcedure
        .input(z.object({ data: telOrEmail, code: z.string(), verificationToken: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const result = await confirmAuth(input.data, input.code, input.verificationToken);

            setSession(ctx.resHeaders, result);

            return result;
        }),
    check: publicProcedure
        .query(async ({ ctx }) => {
            const session = await getSession(ctx.req, ctx.resHeaders);

            if (!session) return null;

            const profile = await getProfile(session.token);

            return { profile, token: session.token };
        }),
    logout: protectedProcedure
        .mutation(async ({ ctx }) => {
            clearSession(ctx.resHeaders);
        }),
});
