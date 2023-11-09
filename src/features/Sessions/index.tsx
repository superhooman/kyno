'use client';

import { Badge, Box, Button, Flex, Grid, Heading, Inset, Separator, Text } from '@radix-ui/themes';
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

import * as cls from './styles.css';

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

    const handleOpen = React.useCallback((id: number) => {
        setUrl(getTickerUrl(id, cityId, locale, movie.id, movie.posters.p168x242, token));
        setOpen(true);
    }, [token, cityId, movie, locale]);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        setUrl('');
    }, []);

    React.useEffect(() => {
        type Message = { ticket: string };
        const handler = (ev: MessageEvent<string | Message>) => {
            if (ev.data === 'close-widget') {
                handleClose();
                return;
            }

            if (ev.data === 'to-main-page') {
                handleClose();
                router.push(routes.home.path);
                return;
            }

            const message = ev.data as Message;

            if ('ticket' in message) {
                if (message.ticket === 'to-ticket') {
                    handleClose();
                    router.push(routes.profile.path);
                    return;
                }
            }
        };
    
        window.addEventListener('message', handler);
    
        return () => window.removeEventListener('message', handler);
    }, [handleClose, router]);

    React.useEffect(() => {
        if (date === initialDate) return;
        setIsLoading(true);
        router.replace(`${pathname}?date=${date}`, { scroll: false });
    }, [date, router, pathname, initialDate]);

    React.useEffect(() => {
        setIsLoading(false);
    }, [initialDate]);

    const content = React.useMemo(
        () =>
            sessions?.map((item) => {
                return (
                    <React.Fragment key={item.session.id}>
                        <Item {...item} onClick={handleOpen} />
                        <Separator size="4" />
                    </React.Fragment>
                );
            }) ?? <Empty />,
        [sessions, handleOpen]
    );

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
                    <iframe src={url} className={cls.iframe} />
                </Inset>
            </Modal>
        </Flex>
    );
};

const StickyLabels: React.FC = () => {
    const t = useI18n();

    return (
        <Flex
            py="3"
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

const Item: React.FC<
    FormattedSessionItemResult & { locale?: string, onClick?: (id: number) => void }
> = ({ session, cinema, hall, onClick }) => {
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
                <Flex grow="1" className={cls.flex} direction="column" gap="1">
                    <Text className={cls.overflow} size="3" weight="bold">
                        {cinema.name}
                    </Text>
                    <Flex gap="2" align="center">
                        <Text size="2" color="gray">
                            {translate(hall.name, locale)}
                        </Text>
                        {getLanguage(session.langId)}
                    </Flex>
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
                <button onClick={handleClick}>
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
