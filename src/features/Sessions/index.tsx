'use client';

import { Badge, Box, Button, Flex, Grid, Heading, Inset, Separator, Tabs, Text } from '@radix-ui/themes';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CaretRight, X } from '@phosphor-icons/react';

import type {
    FormattedFullMovie,
    FormattedSessionItemResult,
} from '@src/server/kinokz/movie/types';

import { CalendarRibbon } from '@src/components/CalendarRibbon';
import { NA } from '@src/constants/placeholder';
import { useCurrentLocale, useI18n } from '@src/locales/client';
import { translate } from '@src/locales/utils';
import { Empty } from '@src/components/Empty';
import { getTickerUrl } from '@src/server/kinokz/utils/ticketUrl';
import { useProfile } from '@src/providers/profileProvider';
import { Modal } from '@src/components/Modal';
import { routes } from '@src/constants/routes';
import { Loader } from '@src/components/Loading';
import { HitEvent, hit } from '@src/analytics';

import * as cls from './styles.css';
import { useMessageHandler } from './hooks/messageHandler';

declare global {
    interface Window {
        ApplePaySession?: typeof ApplePaySession;
    }
}

interface Props {
    availableDates: string[];
    today: string;
    date: string;
    sessions?: FormattedSessionItemResult[];
    movie: FormattedFullMovie;
    cityId: number;
}

const NoData = (
    <Text className={cls.noData} color="gray">
        {NA}
    </Text>
);

const formatPrice = (price: number) => {
    if (price === 0) return NoData;

    const KZT = '₸';

    return `${price.toLocaleString('ru-RU')} ${KZT}`;
};

type Sort = 'time' | 'cinema';

export const Sessions: React.FC<Props> = ({
    availableDates,
    today,
    date: initialDate,
    sessions,
    movie,
    cityId,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [date, setDate] = React.useState(initialDate);
    const { token } = useProfile();
    const t = useI18n();
    const locale = useCurrentLocale();
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = React.useState('');

    const [sort, setSort] = React.useState<Sort>('time');

    const handleOpen = React.useCallback((id: number) => {
        if (!token) {
            router.push(routes.auth.path + '?redirect=' + pathname);
            return;
        };

        hit(HitEvent.BuyStart);

        setUrl(getTickerUrl(id, cityId, locale, movie.id, movie.posters.p168x242, token));
        setOpen(true);
    }, [token, cityId, movie, locale, router, pathname]);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        setUrl('');
    }, []);

    const messageHandler = useMessageHandler({ onClose: handleClose });

    React.useEffect(() => {
        window.addEventListener('message', messageHandler);
    
        return () => window.removeEventListener('message', messageHandler);
    }, [messageHandler]);

    React.useEffect(() => {
        if (date === initialDate) return;
        setIsLoading(true);
        router.replace(`${pathname}?date=${date}`, { scroll: false });
    }, [date, router, pathname, initialDate]);

    React.useEffect(() => {
        setIsLoading(false);
    }, [initialDate]);

    const content = React.useMemo(
        () => {
            if (!sessions) {
                return <Empty />;
            }

            if (sort === 'cinema') {
                const cinemas: Record<number, FormattedSessionItemResult[]> = {};

                sessions.forEach((item) => {
                    const { id } = item.cinema;
                    cinemas[id] = cinemas[id] || [];
                    cinemas[id].push(item);
                });

                return Object.entries(cinemas).map(([id, sessions]) => {
                    const cinema = sessions[0]?.cinema;

                    if (!cinema) return null;

                    return (
                        <Flex direction="column" gap="2" key={id}>
                            <CinemaHeader cinema={cinema} />
                            {sessions.map((item, i) => (
                                <React.Fragment key={item.session.id}>
                                    {i === 0 ? null : <Separator size="4" />}
                                    <Item hideCinema {...item} onClick={handleOpen} />
                                </React.Fragment>
                            ))}
                        </Flex>
                    );
                });
            }

            return sessions.map((item, i) => (
                <React.Fragment key={item.session.id}>
                    {i === 0 ? null : <Separator size="4" />}
                    <Item {...item} onClick={handleOpen} />
                </React.Fragment>
            ));
        },
        [sessions, handleOpen, sort]
    );

    const handleValueChange = React.useCallback((value: string) => {
        setSort(value === 'time' ? 'time' : 'cinema');
    }, []);

    return (
        <Flex direction="column" gap="2">
            <Flex direction="column">
                <Text color="gray" weight="bold" size="2">
                    {t('movie.date')}
                </Text>
                <CalendarRibbon
                    startDate={today}
                    value={date}
                    availableDates={availableDates}
                    onChange={setDate}
                    locale={locale}
                />
            </Flex>
            <Flex
                mx={{
                    initial: '-4',
                    sm: '-2',
                }}
                direction="column"
            >
                <Tabs.Root value={sort} onValueChange={handleValueChange}>
                    <Tabs.List>
                        <Tabs.Trigger value="time">{t('movie.by.time')}</Tabs.Trigger>
                        <Tabs.Trigger value="cinema">{t('movie.by.cinema')}</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </Flex>
            <StickyLabels />
            <Flex className={cls.flex} direction="column" gap="2">
                {isLoading
                    ? [...Array(10)].map((_, i) => <SkeletonItem key={i} />)
                    : content}
            </Flex>
            <Modal
                open={open}
                onOpenChange={setOpen}
                width="md"
            >
                <Inset className={cls.inset}>
                    <Flex p="4" direction="row" align="center" justify="between" gap="4">
                        <Heading size="4" as="h4">
                            {t('ticket.buy')}
                        </Heading>
                        <Button variant="soft" color="gray" size="3" onClick={handleClose}>
                            <X />
                        </Button>
                    </Flex>
                    <Separator size="4" />
                    <div className={cls.content}>
                        <iframe src={url} className={cls.iframe} />
                        <Loader />
                    </div>
                </Inset>
            </Modal>
        </Flex>
    );
};

const StickyLabels: React.FC = () => {
    const t = useI18n();

    return (
        <Flex
            py={{
                initial: '2',
                sm: '3',
            }}
            px={{
                initial: '4',
                sm: '2',
            }}
            mx={{
                initial: '-4',
                sm: '-2',
            }}
            className={cls.tableLabels}
            justify="between"
            align="center"
        >
            <Text
                className={cls.sessionLabel}
                color="gray"
                weight="bold"
                size="2"
            >
                {t('movie.session')}
            </Text>
            <Grid className={cls.grid} columns="4" gap="2">
                {[
                    t('movie.ticket.adult'),
                    t('movie.ticket.child'),
                    t('movie.ticket.student'),
                    t('movie.ticket.vip'),
                ].map((el, i) => (
                    <Box key={i}>
                        <Text
                            as="div"
                            className={cls.columnValue}
                            color="gray"
                            weight="bold"
                            size="2"
                        >
                            {el}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </Flex>
    );
};

const CinemaHeader: React.FC<{ cinema: FormattedSessionItemResult['cinema'] }> = ({ cinema }) => (
    <Flex
        className={cls.cinemaName}
        py="2"
        direction="column"
        px={{
            initial: '4',
            sm: '2',
        }}
        mx={{
            initial: '-4',
            sm: '-2',
        }}
    >
        <Text
            className={cls.overflow}
            weight="bold"
            size={{
                initial: '3',
                sm: '4',
            }}
        >
            {cinema.name}
        </Text>
        <Text
            className={cls.overflow}
            color="gray"
            size={{
                initial: '1',
                sm: '2',
            }}
        >
            {cinema.address}
        </Text>
    </Flex>
);

const Item: React.FC<
    FormattedSessionItemResult & {
        locale?: string,
        onClick?: (id: number) => void,
        hideCinema?: boolean,
    }
> = ({ session, cinema, hall, hideCinema, onClick }) => {
    const t = useI18n();
    const locale = useCurrentLocale();

    const handleClick = React.useCallback(() => {
        onClick?.(session.sessionId);
    }, [onClick, session.sessionId]);

    const getLanguage = React.useCallback(
        (langId: number) => {
            const fallback = null;
            if (langId > 4 || langId === 2 || langId === 0) {
                return fallback;
            }

            const dict = {
                1: t('movie.lang.rus'),
                3: t('movie.lang.kaz'),
                4: t('movie.lang.eng'),
            };

            const colors = {
                1: 'blue',
                3: 'amber',
                4: 'red',
            } as const;

            const label = dict[langId as keyof typeof dict];
            const color = colors[langId as keyof typeof colors];

            if (!label) return fallback;

            return (
                <Badge variant="outline" color={color}>
                    {label.toLocaleUpperCase()}
                </Badge>
            );
        },
        [t]
    );

    const content = (
        <>
            <Flex className={cls.flex} align="stretch" gap="3">
                <Badge
                    className={cls.time}
                    size="2"
                    variant="outline"
                    color={session.canBuyTickets ? 'amber' : 'gray'}
                >
                    {session.hour}:{session.minutes}
                </Badge>
                <Flex grow="1" className={cls.flex} justify="center" direction="column" gap="1">
                    {hideCinema ? (
                        <Flex gap="2" align="center">
                            <Text size="3" weight="bold">
                                {translate(hall.name, locale)}
                            </Text>
                            {getLanguage(session.langId)}
                        </Flex>
                    
                    ) : (
                        <>
                            <Text className={cls.overflow} size="3" weight="bold">
                                {cinema.name}
                            </Text>
                            <Flex gap="2" align="center">
                                <Text size="2" color="gray">
                                    {translate(hall.name, locale)}
                                </Text>
                                {getLanguage(session.langId)}
                            </Flex>
                        </>
                    )}
                </Flex>
                {session.canBuyTickets && (
                    <Flex className={cls.arrow} align="center" shrink="0">
                        <Text color="gray">
                            <CaretRight />
                        </Text>
                    </Flex>
                )}
            </Flex>
            <Grid className={cls.grid} columns="4" gap="2">
                {[
                    formatPrice(session.adult),
                    formatPrice(session.child),
                    formatPrice(session.student),
                    formatPrice(session.vip),
                ].map((el, i) => (
                    <Box key={i}>
                        <Text
                            weight="medium"
                            as="div"
                            className={cls.columnValue}
                            size="2"
                        >
                            {el}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </>
    );

    return (
        <Flex
            direction={{
                initial: 'column',
                sm: 'row',
            }}
            justify="between"
            align={{
                initial: 'stretch',
                sm: 'center',
            }}
            gap="4"
            className={cls.item}
            data-clickable={session.canBuyTickets}
            asChild={!!onClick}
        >
            {onClick ? (
                <button disabled={!session.canBuyTickets} onClick={handleClick}>
                    {content}
                </button>
            ) : content}
        </Flex>
    );
};

const SkeletonItem = () => (
    <React.Fragment>
        <Flex
            direction={{
                initial: 'column',
                sm: 'row',
            }}
            justify="between"
            align={{
                initial: 'stretch',
                sm: 'center',
            }}
            gap="4"
            className={cls.item}
        >
            <Flex className={cls.flex} align="stretch" gap="3">
                <Badge
                    className={cls.time}
                    size="2"
                    variant="outline"
                    color="gray"
                />
                <Flex className={cls.flex} direction="column" gap="1">
                    <Text className={cls.overflow} size="3" weight="bold">
                        {NoData}
                    </Text>
                    <Flex gap="2" align="center">
                        <Text size="2" color="gray">
                            {NoData}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Grid className={cls.grid} columns="4" gap="2">
                {[NoData, NoData, NoData, NoData].map((el, i) => (
                    <Box key={i}>
                        <Text
                            weight="medium"
                            as="div"
                            className={cls.columnValue}
                            size="2"
                        >
                            {el}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </Flex>
        <Separator size="4" />
    </React.Fragment>
);
