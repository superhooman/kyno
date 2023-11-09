'use client';
import React from 'react';
import {
    Button,
    Container,
    Flex,
    Text,
    VisuallyHidden,
} from '@radix-ui/themes';
import Link from 'next/link';
import { NavigationArrow, Ticket } from '@phosphor-icons/react';

import { Logo } from '@src/components/Logo';
import { cityIdToCityName } from '@src/constants/cities';
import { useCity } from '@src/providers/cityProvider';
import { translate } from '@src/locales/utils';
import { useCurrentLocale, useI18n } from '@src/locales/client';
import { DOMAIN, NAME } from '@src/constants/domain';
import { useProfile } from '@src/providers/profileProvider';
import { makeHref } from '@src/constants/routes';

import { Search } from '../Search';
import * as cls from './styles.css';

export const Navbar: React.FC<React.ComponentProps<'nav'>> = ({ ...props }) => {
    const { cityId, openCityModal } = useCity();
    const { isLogged } = useProfile();
    const t = useI18n();

    const locale = useCurrentLocale();

    return (
        <>
            <nav className={cls.root} {...props}>
                <Container px="4" size="4">
                    <Flex gap={{ initial: '2', sm: '4' }} height="9" align="center" justify="between">
                        <Link href={makeHref('home', { locale })}>
                            <Flex shrink="0" gap="2" align="center">
                                <Logo />
                                <VisuallyHidden>{DOMAIN} homepage</VisuallyHidden>
                                <Text className={cls.name} weight="medium" size="3">{NAME}</Text>
                            </Flex>
                        </Link>

                        <Flex
                            direction="column"
                            align="stretch"
                            className={cls.searchWrapper}
                        >
                            <Search />
                        </Flex>

                        <Flex shrink="0" direction={{ initial: 'row-reverse', sm: 'row' }} gap={{ initial: '2', sm: '4' }}>
                            {isLogged ? (
                                <Button className={cls.hideOnMobile} variant="soft" asChild>
                                    <Link href={makeHref('profile', { locale })}>
                                        <Ticket />
                                        <Text>{t('nav.profile')}</Text>
                                    </Link>
                                </Button>
                            ) : (
                                <Button className={cls.hideOnMobile} variant="outline" asChild>
                                    <Link href={makeHref('auth', { locale })}>
                                        <Text>{t('nav.auth')}</Text>
                                    </Link>
                                </Button>
                            )}
                            <Button radius="full" onClick={openCityModal}>
                                <NavigationArrow weight="fill" />
                                <Text>{translate(cityIdToCityName(cityId), locale)}</Text>
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </nav>
            <div className={cls.placeholder} />
        </>
    );
};
