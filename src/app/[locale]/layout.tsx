import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import '@src/styles/reset.css';
import '@radix-ui/themes/styles.css';
import '@src/styles/global.css';

import { getCityId } from '@src/constants/cities';
import { DOMAIN } from '@src/constants/domain';
import { StarSymbol } from '@src/components/Stars/symbol';
import { Theme, getTheme } from '@src/constants/theme';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: DOMAIN,
    metadataBase: new URL(`https://${DOMAIN}/`),
    openGraph: {
        images: ['/og.png']
    }
};

const generateThemeAttrs = (theme: Theme) => {
    if (theme == Theme.System) {
        return {};
    }

    return {
        className: theme,
        style: {
            colorScheme: theme
        }
    };
};

const themeColors = {
    [Theme.Dark]: '#121113',
    [Theme.Light]: '#fdfcfd',
};

export default function RootLayout({
    params: { locale },
    children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
    const c = cookies();
    const cityId = getCityId(c);
    const theme = getTheme(c);

    const htmlAttrs = generateThemeAttrs(theme);

    return (
        <html lang={locale} {...htmlAttrs} suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ffc100" />
                <meta name="msapplication-TileColor" content="#121113" />
                {
                    theme === Theme.System ? (
                        <>
                            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                            <meta name="theme-color" content="#121113" media="(prefers-color-scheme: dark)" />
                        </>
                    ) : (
                        <meta name="theme-color" content={themeColors[theme]} />
                    )
                }
            </head>
            <body className={inter.className}>
                <Providers locale={locale} cityId={cityId} theme={theme}>
                    {children}
                </Providers>
                <StarSymbol />
            </body>
        </html>
    );
}
