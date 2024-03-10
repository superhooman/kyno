import { Suspense } from 'react';

import type { Metadata } from 'next';

import { getI18n } from '@src/locales/server';
import { getTitle } from '@src/constants/title';
import { getSoonMovies } from '@src/server/kinokz/home';
import { Soon } from '@src/features/Soon';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();
 
    return {
        title: getTitle(t('main.title')),
        description: t('description'),
    };
}

export default function Page() {
    return (
        <Suspense fallback={(
            <Fallback />
        )}>
            <SoonPage />
        </Suspense>
    );
}

function Fallback() {
    return (
        <Soon isSkeleton />
    );
}

async function SoonPage() {
    const movies = await getSoonMovies();

    return (
        <Soon movies={movies} />
    );
};
