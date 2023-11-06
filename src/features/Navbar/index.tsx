'use client';
import React from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    VisuallyHidden,
} from '@radix-ui/themes';
import Link from 'next/link';
import { NavigationArrow } from '@phosphor-icons/react';

import { Logo } from '@src/components/Logo';
import { cityIdToCityName } from '@src/constants/cities';
import { useCity } from '@src/providers/cityProvider';
import { translate } from '@src/locales/utils';
import { useCurrentLocale } from '@src/locales/client';
import { DOMAIN, NAME } from '@src/constants/domain';

import { Search } from '../Search';
import * as cls from './styles.css';

interface Props extends React.ComponentProps<'nav'> {
  // cityId: CityId;
}

export const Navbar: React.FC<Props> = ({ ...props }) => {
    const { cityId, openCityModal } = useCity();

    const locale = useCurrentLocale();

    return (
        <nav className={cls.root} {...props}>
            <Container px="4" size="4">
                <Flex gap="4" height="9" align="center" justify="between">
                    <Link href="/">
                        <Flex shrink="0" gap="2" align="center">
                            <Logo />
                            <VisuallyHidden>{DOMAIN} homepage</VisuallyHidden>
                            <Text className={cls.name} weight="medium" size="3">{NAME}</Text>
                        </Flex>
                    </Link>

                    <Flex
                        direction="column"
                        align="stretch"
                        style={{ maxWidth: 320, width: '100%' }}
                    >
                        <Search />
                    </Flex>

                    <Box shrink="0">
                        <Button radius="full" onClick={openCityModal}>
                            <NavigationArrow weight="fill" />
                            <Text>{translate(cityIdToCityName(cityId), locale)}</Text>
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};
