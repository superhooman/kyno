import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import '@src/styles/reset.css';
import '@radix-ui/themes/styles.css';
import '@smastrom/react-rating/style.css';

import { getCityId } from '@src/constants/cities';
import { DOMAIN } from '@src/constants/domain';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: DOMAIN,
    description: 'Kino.kz UX improvement project',
    metadataBase: new URL(`https://${DOMAIN}/`),
    openGraph: {
        images: ['/og.png']
    }
};

export default function RootLayout({
    params: { locale },
    children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
    const cityId = getCityId(cookies());

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ffc100" />
                <meta name="msapplication-TileColor" content="#121113" />
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#121113" media="(prefers-color-scheme: dark)" />
            </head>
            <body className={inter.className}>
                <Providers locale={locale} cityId={cityId}>{children}</Providers>
            </body>
        </html>
    );
}
