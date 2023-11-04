'use client';

import { IconContext } from '@phosphor-icons/react';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { amber } from '@radix-ui/colors';

import type { CityId } from '@src/constants/cities';

import { I18nProviderClient } from '@src/locales/client';
import { CityProvider } from '@src/providers/cityProvider';

export const Providers: React.FC<
  React.PropsWithChildren<{ cityId: CityId; locale: string }>
> = ({ children, cityId, locale }) => {
    return (
        <I18nProviderClient locale={locale}>
            <ThemeProvider themes={['dark', 'light', 'system']} attribute="class">
                <Theme
                    accentColor="amber"
                    grayColor="mauve"
                    panelBackground="solid"
                    radius="large"
                >
                    <IconContext.Provider value={{ weight: 'bold', size: 16 }}>
                        <ProgressBar color={amber.amber9} options={{ showSpinner: false }} />
                        <CityProvider initialValue={cityId}>{children}</CityProvider>
                    </IconContext.Provider>
                </Theme>
            </ThemeProvider>
        </I18nProviderClient>
    );
};
