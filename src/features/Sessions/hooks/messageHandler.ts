import React from 'react';
import { useRouter } from 'next/navigation';

// import { api } from '@src/trpc/react';
import { routes } from '@src/constants/routes';
import { HitEvent, hit } from '@src/analytics';

type Message = { ticket: string } | {
    message: 'apple-pay',
    paymentRequest: ApplePayJS.ApplePayPaymentRequest,
    invoice_id: string,
    source: string,
};

interface Props {
    onClose: () => void;
}

export const useMessageHandler = ({ onClose }: Props) => {
    const router = useRouter();
    // const { mutateAsync: paymentToken } = api.applePay.paymentToken.useMutation();
    // const { mutateAsync: paymentSession } = api.applePay.paymentSession.useMutation();

    return React.useCallback((e: MessageEvent<string | Message>) => {
        if (e.data === 'close-widget') {
            onClose();
            return;
        }

        if (e.data === 'to-main-page') {
            onClose();
            router.push(routes.home.path);
            return;
        }

        const message = e.data as Message;

        if (typeof message === 'object' && 'ticket' in message) {
            if (message.ticket === 'to-ticket') {
                onClose();
                hit(HitEvent.BuySuccessProfile);
                router.push(routes.profile.path);
                return;
            }
        }

        if (typeof message === 'object' && 'message' in message) {
            if (message.message === 'apple-pay') {
                const { ApplePaySession } = window;
                if (typeof ApplePaySession === 'undefined') {
                    alert('Apple Pay is not supported');
                    return;
                }


                // TODO: remove this if kyno.kz is verified domain for apple pay
                if (true) {
                    alert('Apple Pay is not supported yet');
                    return;
                }

                // const R = new ApplePaySession(1, message.paymentRequest);

                // R.onpaymentauthorized = (e) => {
                //     paymentToken({ invoiceId: message.invoice_id, source: message.source, paymentToken: e.payment })
                //         .then(() => {
                //             R.completeMerchantValidation(ApplePaySession.STATUS_SUCCESS);
                //         })
                //         .catch((e) => {
                //             console.log(e);
                //             R.completeMerchantValidation(ApplePaySession.STATUS_FAILURE);
                //         });
                // };

                // R.onvalidatemerchant = (e) => {
                //     paymentSession(e.validationURL)
                //         .then((res) => {
                //             R.completeMerchantValidation(res);
                //         })
                //         .catch((e) => {
                //             console.log(e);
                //             R.abort();
                //         });
                // };

                // R.begin();
            }
        }
    }, [onClose, router]);
};
