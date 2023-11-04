import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-US';
import kk from 'date-fns/locale/kk';

export const getDateLocale = (locale = 'ru') => {
    return { ru, en, kk }[locale] as Locale;
};
