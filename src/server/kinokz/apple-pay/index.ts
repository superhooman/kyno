import type { ApplePaySession } from './types';

import { request, requestRaw } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const paymentToken = async (invoiceId: string, source: string, paymentToken: any, token: string) => {
    await request('/c-pay/v1/apple-pay/payment-token', {
        method: 'POST',
        payload: {
            inovice_id: invoiceId,
            source,
            payment_token: paymentToken,
        },
        token,
    });
};

export const paymentSession = async (validationUrl: string, token: string) => {
    const payload = {
        validation_url: validationUrl,
    };

    const response = await requestRaw<ApplePaySession, typeof payload>('/c-pay/v1/apple-pay/payment-session', {
        method: 'POST',
        payload,
        token,
        headers: {
            'Accept': 'application/json',
            'Referer': 'https://kino.kz/',
            'Origin': 'https://kino.kz',
            'User-Agent': ' Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
        }
    });

    return response;
};
