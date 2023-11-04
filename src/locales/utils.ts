export interface TranslatableValue {
    ru: string;
    en: string;
    kk: string;
}

export const translate = (values: TranslatableValue, locale = 'ru') => {
    const value = values[locale as keyof TranslatableValue];
    return value || values.ru;
};
