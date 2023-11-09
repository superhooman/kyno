'use client';

import { IconContext } from '@phosphor-icons/react';
import { Theme } from '@radix-ui/themes';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { amber } from '@radix-ui/colors';
import { Toaster } from 'sonner';

import type { CityId } from '@src/constants/cities';

import { I18nProviderClient } from '@src/locales/client';
import { CityProvider } from '@src/providers/cityProvider';
import { ThemeProvider } from '@src/providers/themeProvider';
import { type Theme as T } from '@src/constants/theme';
import { ProfileProvider } from '@src/providers/profileProvider';

export const Providers: React.FC<
  React.PropsWithChildren<{ cityId: CityId; locale: string, theme: T }>
> = ({ children, cityId, locale, theme }) => {
    return (
        <I18nProviderClient locale={locale}>
            <ThemeProvider theme={theme}>
                <Theme
                    accentColor="amber"
                    grayColor="mauve"
                    panelBackground="solid"
                    radius="large"
                    appearance="inherit"
                >
                    <IconContext.Provider value={{ weight: 'bold', size: 16 }}>
                        <ProfileProvider>
                            <Toaster richColors />
                            <ProgressBar color={amber.amber9} options={{ showSpinner: false }} />
                            <CityProvider initialValue={cityId}>
                                {children}
                            </CityProvider>
                        </ProfileProvider>
                    </IconContext.Provider>
                </Theme>
            </ThemeProvider>
        </I18nProviderClient>
    );
};
