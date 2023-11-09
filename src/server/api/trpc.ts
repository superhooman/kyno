import { initTRPC, TRPCError } from '@trpc/server';
import { type NextResponse, type NextRequest } from 'next/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { getSession } from '../auth';

export const createTRPCContext = async (opts: { req: NextRequest, resHeaders: NextResponse['headers'] }) => {
    const locale = opts.req.cookies.get('Next-Locale')?.value ?? 'ru';

    return {
        ...opts,
        locale,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});


export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
    const session = await getSession(ctx.req, ctx.resHeaders);

    if (!session) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do that.',
        });
    }

    return next({
        ctx: {
            ...ctx,
            session,
        },
    });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
