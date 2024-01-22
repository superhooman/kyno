import splitbee from '@splitbee/web';

import { isProduction } from '@src/utils/isProduction';

export enum HitEvent {
    Auth = 'Auth',
    BuyStart = 'BuyStart',
    BuySuccessProfile = 'BuySuccessProfile',
    Search = 'Search',
    Ticket = 'Ticket',
}

interface Data {
    [key: string]: string | number | boolean | string;
}

export const hit = <Event extends HitEvent>(event: Event, data?: Data) => {
    if (isProduction()) {
        splitbee.track(event, data);
    }
};
