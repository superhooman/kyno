'use client';
import React from 'react';

import type { Profile } from '@src/server/kinokz/auth/types';

import { api } from '@src/trpc/react';
import { formatPhone } from '@src/constants/phone';

interface ProfileContext {
    profile?: Profile;
    profileName?: string;
    isLogged: boolean;
    isLoading: boolean;
    token?: string;
    logout: () => Promise<void>;
}

const ProfileContext = React.createContext<ProfileContext>({
    isLogged: false,
    isLoading: true,
    logout: () => Promise.resolve(),
});

export const useProfile = () => React.useContext(ProfileContext);

interface Props {
    profile?: Profile;
}

export const ProfileProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
    const apiUtils = api.useUtils();
    const { mutateAsync: logoutAsync, isLoading: isLoggingOut } = api.auth.logout.useMutation();
    const { isLoading, data } = api.auth.check.useQuery(undefined);

    const handleLogout = React.useCallback(async () => {
        await logoutAsync();
        apiUtils.invalidate();
    }, [logoutAsync, apiUtils]);

    const profileName = React.useMemo(() => {
        if (!data) {
            return;
        }

        if (data.profile.first_name) {
            return data.profile.first_name;
        }

        if (data.profile.phone) {
            return formatPhone(data.profile.phone);
        }

        return data.profile.email;
    }, [data]);

    const value = React.useMemo(() => ({
        profile: data?.profile ?? undefined,
        token: data?.token ?? undefined,
        profileName,
        isLogged: !!data,
        isLoading: isLoading || isLoggingOut,
        logout: handleLogout,
    }), [data, isLoading, isLoggingOut, handleLogout, profileName]);

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
