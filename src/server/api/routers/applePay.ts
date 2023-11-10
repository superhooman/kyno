import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
} from '@src/server/api/trpc';
import { paymentToken, paymentSession } from '@src/server/kinokz/apple-pay';

export const applePayRouter = createTRPCRouter({
    paymentToken: protectedProcedure
        .input(
            z.object({
                invoiceId: z.string(),
                source: z.string(),
                paymentToken: z.any(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await paymentToken(input.invoiceId, input.source, input.paymentToken, ctx.session.token);
        }),
    paymentSession: protectedProcedure
        .input(
            z.string()
        )
        .mutation(async ({ ctx, input }) => {
            const session = await paymentSession(input, ctx.session.token);
            return session;
        }),
});
