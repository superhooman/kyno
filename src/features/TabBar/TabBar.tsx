import { Flex, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { IconContext, Key, Popcorn, Ticket } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useDebounce } from 'usehooks-ts';

import { useCurrentLocale, useI18n } from '@src/locales/client';
import { makeHref } from '@src/constants/routes';
import { useProfile } from '@src/providers/profileProvider';
import { Loader } from '@src/components/Loading';

import * as cls from './styles.css';

const matched = (pathname: string, href: string) => {
    const resolvedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const resolvedHref = href.endsWith('/') ? href : `${href}/`;

    return resolvedPathname === resolvedHref;
};

const TabBar = () => {
    const pathname = usePathname();
    const t = useI18n();
    const locale = useCurrentLocale();
    const { isLogged, isLoading } = useProfile();

    const [hidden, setHidden] = React.useState<boolean>(true);

    const isHidden = useDebounce(hidden, 250);

    const links = React.useMemo(() => [
        {
            name: t('nav.home'),
            href: makeHref('home', { locale }),
            icon: <Popcorn />,
            filledIcon: <Popcorn weight="duotone" />,
        },
        // {
        //     name: t('nav.cinemas'),
        //     href: makeHref('cinemas', { locale }),
        //     icon: <Compass />,
        //     filledIcon: <Compass weight="duotone" />,
        // },
        (isLogged ? (
            {
                name: t('nav.profile'),
                href: makeHref('profile', { locale }),
                icon: <Ticket />,
                filledIcon: <Ticket weight="duotone" />,
            }
        ) : (
            {
                name: isLoading ? t('loading') : t('nav.auth'),
                href: isLoading ? '#' : makeHref('auth', { locale }),
                icon: isLoading ? <Loader /> : <Key />,
                filledIcon: isLoading ? <Loader /> : <Key weight="duotone" />,
            }
        )),
    ], [locale, t, isLogged, isLoading]);

    React.useLayoutEffect(() => {
        setHidden(false);
    }, []);

    // React.useEffect(() => {
    //     // hide on scroll down, show on scroll up
    //     let prevScrollPos = window.scrollY;

    //     const handleScroll = () => {
    //         const currentScrollPos = window.scrollY;
    //         setHidden(prevScrollPos < currentScrollPos && currentScrollPos > 100);
    //         prevScrollPos = currentScrollPos;
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


    return (
        <IconContext.Provider value={{ weight: 'regular', size: 24 }}>
            <Flex data-hidden={isHidden} data-radius="full" asChild justify="center" gap="4">
                <nav className={cls.root}>
                    {links.map((link) => {
                        const isMatched = matched(pathname, link.href);
                        return (
                            <NextLink className={cls.link} data-matched={isMatched} key={link.href} href={link.href}>
                                <Flex gap="1" align="center" justify="center" direction="column">
                                    {isMatched ? link.filledIcon : link.icon}
                                    <Text weight="medium" size="1">{link.name}</Text>
                                </Flex>
                            </NextLink>
                        );
                    })}
                </nav>
            </Flex>
        </IconContext.Provider>
    );
};

export default TabBar;
