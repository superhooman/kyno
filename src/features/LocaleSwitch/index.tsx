'use client';

import { Select } from '@radix-ui/themes';

import { useChangeLocale, useCurrentLocale } from '@src/locales/client';

const LOCALES = ['ru', 'en', 'kk'] as const;

const LOCALE_NAMES = {
    ru: 'Русский',
    en: 'English',
    kk: 'Қазақша',
} as const;

export const LocaleSwitch = () => {
    const currentLocale = useCurrentLocale();

    const changeLocale = useChangeLocale();

    return (
        <Select.Root onValueChange={v => changeLocale(v as (typeof LOCALES)[number])} value={currentLocale}>
            <Select.Trigger color="gray" variant="soft" />
            <Select.Content variant="soft">
                {LOCALES.map((locale) => (
                    <Select.Item key={locale} value={locale}>{LOCALE_NAMES[locale]}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};
