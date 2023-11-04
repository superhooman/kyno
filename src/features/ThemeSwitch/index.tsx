'use client';

import { Monitor, Moon, Sun } from '@phosphor-icons/react';
import { Button, Flex } from '@radix-ui/themes';
import { useTheme } from 'next-themes';

const themes = [
    {
        name: 'dark',
        icon: <Moon />
    },
    {
        name: 'light',
        icon: <Sun />
    },
    {
        name: 'system',
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
