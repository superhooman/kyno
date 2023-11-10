'use client';
import { Button, Callout, Flex, Heading, Inset, Text, TextField } from '@radix-ui/themes';
import { useMask } from '@react-input/mask';
import React from 'react';
import { CodeInput, getSegmentCssWidth } from 'rci';
import { CaretLeft, SignIn } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

import { api } from '@src/trpc/react';
import { Logo } from '@src/components/Logo';
import { useProfile } from '@src/providers/profileProvider';
import { Loader } from '@src/components/Loading';
import { useI18n } from '@src/locales/client';
import { MASK, formatPhone, onlyDigits } from '@src/constants/phone';

import * as cls from './styles.css';

type State = 'initial' | 'code';

export const Auth = () => {
    const t = useI18n();
    const router = useRouter();
    const { isLogged } = useProfile();

    React.useEffect(() => {
        if (isLogged) {
            router.push('/profile');
        }
    }, [isLogged, router]);

    return (
        <Inset my="-6">
            <Flex className={cls.root} align="center" justify="center">
                <Flex direction="column" gap="4" className={cls.card}>
                    <Flex
                        direction="column"
                        gap="2"
                    >
                        <Text as="div" align="center" color="amber">
                            <Logo />
                        </Text>
                        <Heading align="center">{t('auth.title')}</Heading>
                        <Text size="2" color="gray" as="p" align="center">{t('auth.subtitle')}</Text>
                    </Flex>
                    <PhoneForm />
                </Flex>
            </Flex>
        </Inset>
    );
};


const OTP_LENGTH = 5;
const PADDING = 'var(--space-3)';
const WIDTH = getSegmentCssWidth(PADDING);

export const PhoneForm = () => {
    const t = useI18n();
    const router = useRouter();
    const [phone, setPhone] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');
    const [state, setState] = React.useState<State>('initial');

    const params = useSearchParams();

    const [verificationToken, setVerificationToken] = React.useState<string>('');

    const [formattedPhone, setFormattedPhone] = React.useState<string>('');

    React.useEffect(() => {
        setFormattedPhone(onlyDigits(phone));
    }, [phone]);

    const apiUtils = api.useUtils();
    const { mutateAsync: getCode, isLoading: isInitialLoading } = api.auth.signIn.useMutation();
    const { mutateAsync: submitCode, isLoading: isCodeLoading } = api.auth.signInWithCode.useMutation();

    const inputRef = useMask({
        mask: MASK,
        replacement: { _: /\d/ },
    });

    const codeInputRef = React.useRef<HTMLInputElement>(null);

    const handlePhoneChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setPhone((prev) => {
            const prevDigits = onlyDigits(prev);
            const valueDigits = onlyDigits(value);
            const diff = valueDigits.length - prevDigits.length;

            if (valueDigits.length === 12 && diff > 1) {
                return formatPhone(valueDigits.slice(2));
            }

            if (prevDigits.length === 11 && diff === 1) {
                return prev;
            }

            return value;
        });
    }, []);

    const handleInitialSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getCode({ phone: formattedPhone }).then((res) => {
            setVerificationToken(res.verification_token);
            setState('code');
        }).catch(() => {
            toast.error(t('auth.number.error'));
        });
    }, [formattedPhone, getCode, t]);

    const handleCodeChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyDigits(e.target.value);
        e.target.value = value;
        setCode(value);
    }, []);

    const handleBackClick = React.useCallback(() => {
        setState('initial');
        setPhone('');
        setFormattedPhone('');
    }, []);

    const handleCodeSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submitCode({ data: { phone: formattedPhone }, code, verificationToken }).then(() => {
            apiUtils.invalidate();
            const redirect = params.get('redirect');
            
            if (redirect) {
                router.push(redirect);
            } else {
                router.push('/profile');
            }
        }).catch(() => {
            toast.error(t('auth.code.error'));
        });
    }, [formattedPhone, code, submitCode, router, verificationToken, apiUtils, t, params]);


    const isPhoneDisabled = formattedPhone.length !== 11 || isInitialLoading;
    const isOtpDisabled = code.length !== OTP_LENGTH || isCodeLoading;

    if (state === 'initial') {
        return (
            <Flex asChild direction="column" gap="4">
                <form onSubmit={handleInitialSubmit}>
                    <TextField.Root>
                        <TextField.Input
                            type="text"
                            autoFocus
                            placeholder="+7 (___) ___-__-__"
                            size="3"
                            ref={inputRef}
                            value={phone}
                            onChange={handlePhoneChange}
                            autoComplete="tel"
                        />
                    </TextField.Root>
                    <Button disabled={isPhoneDisabled} size="3" type="submit">
                        {isInitialLoading ? <Loader /> : null}
                        {t('auth.proceed')}
                    </Button>
                </form>
            </Flex>
        );
    }

    return (
        <Flex asChild direction="column" align="center" gap="4">
            <form onSubmit={handleCodeSubmit}>
                <Callout.Root size="1">
                    <Callout.Text>
                        Code sent to <Text as="span" weight="bold">{phone}</Text>
                    </Callout.Text>
                </Callout.Root>
                <CodeInput
                    length={OTP_LENGTH}
                    spellCheck={false}
                    inputRef={codeInputRef}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    padding={PADDING}
                    fontSize="var(--font-size-7)"
                    autoComplete="one-time-code"
                    onChange={handleCodeChange}
                    renderSegment={({ state, index }) => (
                        <div
                            key={index}
                            className={cls.pinInput}
                            data-state={state}
                            style={{ width: WIDTH, height: '100%' }}
                        >
                            <div />
                        </div>
                    )}
                />
                <Flex gap="4">
                    <Button type="reset" onClick={handleBackClick} size="3" variant="soft">
                        <CaretLeft />
                        {t('auth.back')}
                    </Button>
                    <Button disabled={isOtpDisabled} size="3" type="submit">
                        {t('auth.proceed')}
                        {isCodeLoading ? <Loader /> : <SignIn />}
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};
