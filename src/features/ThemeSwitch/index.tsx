'use client';

import { Monitor, Moon, Sun } from '@phosphor-icons/react';
import { Button, Flex } from '@radix-ui/themes';

import { Theme } from '@src/constants/theme';
import { useTheme } from '@src/providers/themeProvider';

const themes = [
    {
        name: Theme.Dark,
        icon: <Moon />
    },
    {
        name: Theme.Light,
        icon: <Sun />
    },
    {
        name: Theme.System,
        icon: <Monitor />
    }
];

export const ThemeSwitch = () => {
    const { setTheme, theme } = useTheme();

    return (
        <Flex gap="2">
            {themes.map((item) => (
                <Button
                    key={item.name}
                    variant="soft"
                    size="2"
                    color={item.name === theme ? 'amber' : 'gray'}
                    onClick={() => setTheme(item.name)}
                >
                    {item.icon}
                </Button>
            ))}
        </Flex>
    );
};
