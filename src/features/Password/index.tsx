'use client';

import { Button, Flex, Text, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Check } from '@phosphor-icons/react';

import { api } from '@src/trpc/react';
import { Logo } from '@src/components/Logo';

export const Password = () => {
    const router = useRouter();
    const { mutateAsync, isLoading } = api.auth.protected.useMutation();
    const [value, setValue] = React.useState('');

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutateAsync({ password: value }).then((res) => {
            if (res.success) {
                toast.success('Success');
                router.push('/');
                return;
            }

            toast.error('Wrong password');
        });
    }, [router, mutateAsync, value]);

    return (
        <Flex grow="1" gap="3" direction="column" align="center" justify="center">
            <Text color="amber">
                <Logo />
            </Text>
            <Flex px="4" gap="2" align="center" asChild>
                <form onSubmit={handleSubmit}>
                    <TextField.Root size="3">
                        <TextField.Input
                            type="password"
                            value={value}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </TextField.Root>
                    <Button size="3" type="submit" disabled={isLoading}>
                        <Check />
                    </Button>
                </form>
            </Flex>
        </Flex>
    );
};
