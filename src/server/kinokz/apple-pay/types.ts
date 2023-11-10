export interface ApplePaySession {
    epochTimestamp: number;
    expiresAt: number;
    merchantSessionIdentifier: string;
    nonce: string;
    merchantIdentifier: string;
    domainName: string;
    displayName: string;
    signature: string;
    operationalAnalyticsIdentifier: string;
    retries: number;
    pspId: string;
}  
