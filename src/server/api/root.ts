import { authRouter } from '@src/server/api/routers/auth';
import { createTRPCRouter } from '@src/server/api/trpc';

import { ticketsRouter } from './routers/tickets';
import { applePayRouter } from './routers/applePay';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    auth: authRouter,
    tickets: ticketsRouter,
    applePay: applePayRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
