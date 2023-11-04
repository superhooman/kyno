import { Container, Flex, Link, Separator, Text } from '@radix-ui/themes';

import { Logo } from '@src/components/Logo';
import { DOMAIN, NAME } from '@src/constants/domain';

import * as cls from './styles.css';
import { LocaleSwitch } from '../LocaleSwitch';
import { ThemeSwitch } from '../ThemeSwitch';

export const Footer = () => {
    const now = new Date();
    return (
        <footer className={cls.footer}>
            <Container px="4" py="8" size="4">
                <Flex direction="row" justify="between" align="center" gap="4">
                    <Text as="div" color="gray">
                        <Flex direction="column" gap="2">
                            <Flex ml="-1">
                                <Logo />
                            </Flex>
                            <Flex direction="column">
                                <Text className={cls.name} weight="medium" size="4">
                                    {NAME}
                                </Text>
                                <Text size="2">
                                    {now.getFullYear()} / {DOMAIN}
                                </Text>
                            </Flex>
                        </Flex>
                    </Text>
                    <Flex gap="3" direction="column">
                        <LocaleSwitch />
                        <ThemeSwitch />
                    </Flex>
                </Flex>
                <Separator mt="5" size="4" />
                <Text mt="5" size="1" color="gray" align="center" as="p">Проект не несет за собой цели навредить kino.kz. Это всего лишь попытка улучшить UX, который предлагает kino.kz</Text>
                <Flex align="center" justify="center">
                    <Link asChild size="1">
                        <a href="https://t.me/whoisabyk" target="_blank" rel="noopener noreferrer">
                            by abyk
                        </a>
                    </Link>
                </Flex>
            </Container>
        </footer>
    );
};
