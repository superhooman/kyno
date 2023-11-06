import format from 'date-fns/format';

export const formatDateString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};
