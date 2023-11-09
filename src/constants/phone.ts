export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const MASK = '+7 (___) ___-__-___';

export const formatPhone = (phone: string) => {
    let digits = onlyDigits(phone);

    if (digits.length === 11) {
        digits = digits.slice(1);
    }

    // fill MASK with digits
    let i = 0;
    return MASK.replace(/_/g, () => digits[i++] || '');
};
