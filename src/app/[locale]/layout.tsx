import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import '@src/styles/reset.css';
import '@radix-ui/themes/styles.css';
import '@src/styles/global.css';

import { getCityId } from '@src/constants/cities';
import { DOMAIN } from '@src/constants/domain';
import { StarSymbol } from '@src/components/Stars/symbol';
import { Theme, getTheme } from '@src/constants/theme';
import { TRPCReactProvider } from '@src/trpc/react';
import { LOCALES } from '@src/constants/i18n';

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

    const headersList = headers();
    const pathname = headersList.get('x-pathname') || '/';

    return (
        <html lang={locale} {...htmlAttrs} suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ffc100" />
                <meta name="msapplication-TileColor" content="#121113" />
                {Object.values(LOCALES).map((lang, i) => (
                    <link rel="alternate" hrefLang={lang} href={`https://${DOMAIN}${pathname.replace(locale, lang)}`} key={locale + '_' + i} />
                ))}
                <link rel="alternate" hrefLang="x-default" href={`https://${DOMAIN}${pathname.replace('/' + locale, '')}`} />
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
                <TRPCReactProvider headers={headers()}>
                    <Providers locale={locale} cityId={cityId} theme={theme}>
                        {children}
                        <div id="vaul" />
                    </Providers>
                </TRPCReactProvider>
                <StarSymbol />
                <Analytics />
            </body>
        </html>
    );
}

export const runtime = 'edge';
