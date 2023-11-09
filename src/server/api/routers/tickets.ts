import {
    createTRPCRouter,
    protectedProcedure,
} from '@src/server/api/trpc';
import { getActiveTickets, getTicketsHistory } from '@src/server/kinokz/tickets';

export const ticketsRouter = createTRPCRouter({
    active: protectedProcedure
        .query(async ({ ctx }) => {
            const active = await getActiveTickets(ctx.session.token, ctx.locale);

            return active;
        }),
    history: protectedProcedure
        .query(async ({ ctx }) => {
            const history = await getTicketsHistory(ctx.session.token, ctx.locale);

            return history;
        }),
});
