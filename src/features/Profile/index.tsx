'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Badge,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Inset,
    Separator,
    Text,
} from '@radix-ui/themes';
import format from 'date-fns/format';
import { SignOut, X } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';

import type { Ticket as TicketType } from '@src/server/kinokz/tickets/types';

import { useProfile } from '@src/providers/profileProvider';
import { LoadingContainer } from '@src/components/Loading';
import { api } from '@src/trpc/react';
import { useI18n } from '@src/locales/client';
import { Empty } from '@src/components/Empty';
import { Modal } from '@src/components/Modal';
import { Logo } from '@src/components/Logo';
import { convertImageUrl } from '@src/server/kinokz/utils/images';
import { Details } from '@src/components/Details';
import { formatPrice } from '@src/utils/formatPrice';

import * as cls from './styles.css';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

const calulateSeats = (ticket: TicketType) => {
    const seats: Record<string, string[]> = {};

    ticket.tickets?.forEach((ticket) => {
        const { row, place } = ticket;
        const rowStr = row.toString();
        const seatStr = place.toString();

        if (!seats[rowStr]) {
            seats[rowStr] = [];
        }

        seats[rowStr].push(seatStr);
    });

    return seats;
};

export const Profile = () => {
    const router = useRouter();
    const { profile, isLoading, isLogged, logout } = useProfile();
    const t = useI18n();

    const [showMore, setShowMore] = React.useState(false);
    const [selectedTicket, setSelectedTicket] =
        React.useState<TicketType | null>(null);

    const { data: active } = api.tickets.active.useQuery(undefined, {
        enabled: isLogged,
    });

    const { data: history, isLoading: ticketsAreLoading } =
        api.tickets.history.useQuery(undefined, {
            enabled: isLogged,
        });

    React.useEffect(() => {
        if (!isLoading && !isLogged) {
            router.push('/auth');
        }
    }, [isLoading, isLogged, router]);

    const handleTicketClick = React.useCallback((ticket: TicketType) => {
        setSelectedTicket(ticket);
        setShowMore(true);
    }, []);

    const renderTicket = React.useCallback(
        (ticket: TicketType, handlers?: boolean) => {
            return (
                <Ticket
                    ticket={ticket}
                    onClick={handlers ? handleTicketClick : undefined}
                    noDecoration={!handlers}
                />
            );
        },
        [handleTicketClick]
    );

    const closeTicket = React.useCallback(() => {
        setShowMore(false);
    }, []);

    if (isLoading && !profile) return <LoadingContainer grow />;

    const hasActive = active && active.length > 0;

    return (
        <Flex
            direction="column"
            align={{ initial: 'stretch', sm: 'start' }}
            gap={{ initial: '6', sm: '8' }}
        >
            <Flex align="center" justify="between" width="100%" gap="4">
                <Heading size="6" as="h2">
                    {t('nav.profile')}
                </Heading>
                <Button variant="soft" color="gray" onClick={logout}>
                    <SignOut />
                    {t('auth.logout')}
                </Button>
            </Flex>
            {hasActive ? (
                <Grid
                    width="100%"
                    columns={{ initial: '1', sm: '2' }}
                    gap={{ initial: '6', sm: '8' }}
                >
                    {active.map((t) => renderTicket(t, true))}
                </Grid>
            ) : null}
            {hasActive ? (
                <Heading size="5" as="h3">
                    {t('ticket.history')}
                </Heading>
            ) : null}
            {!hasActive && !ticketsAreLoading && history?.length === 0 ? (
                <Empty />
            ) : null}
            <Grid
                width="100%"
                columns={{ initial: '1', sm: '2' }}
                gap={{ initial: '6', sm: '8' }}
            >
                {history?.map((t) => renderTicket(t, true))}
                {ticketsAreLoading && !history ? (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <TicketSkeleton key={i} index={i} />
                        ))}
                    </>
                ) : null}
            </Grid>
            <Modal open={showMore} width="xxs" onOpenChange={setShowMore}>
                {selectedTicket ? (
                    <ModalContent
                        ticket={selectedTicket}
                        closeTicket={closeTicket}
                    />
                ) : null}
            </Modal>
        </Flex>
    );
};

const ModalContent: React.FC<{
    ticket: TicketType;
    closeTicket: () => void;
}> = ({ ticket, closeTicket }) => {
    const t = useI18n();
    const movie = ticket.tickets?.[0];

    const date = React.useMemo(() => {
        const d = new Date(ticket.date);

        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

        return format(new Date(d), 'dd.MM.yyyy • HH:mm');
    }, [ticket.date]);

    const seats = React.useMemo(() => {
        return calulateSeats(ticket);
    }, [ticket]);

    if (!movie) {
        return null;
    }

    return (
        <>
            <Inset>
                <Flex
                    className={cls.flex}
                    p="4"
                    direction="row"
                    align="center"
                    justify="between"
                    gap="4"
                >
                    <Heading className={cls.noWrap} size="4" as="h4">
                        {movie.movie_name}
                    </Heading>
                    <Button
                        variant="soft"
                        color="gray"
                        size="3"
                        onClick={closeTicket}
                    >
                        <X />
                    </Button>
                </Flex>
                <Separator size="4" />
                <div
                    style={{
                        backgroundImage: `url(${convertImageUrl(
                            movie.poster,
                            'p1192x597'
                        )})`,
                    }}
                    className={cls.mediaContainer}
                />
                <Separator size="4" />
                <Flex direction="column" gap="4" p="4">
                    <Details
                        items={[
                            [t('ticket.time'), date],
                            [t('ticket.cinema'), movie.theatre],
                            [t('ticket.hall'), movie.hall_name],
                            [t('ticket.price'), formatPrice(ticket.amount)],
                        ]}
                    />
                    <Flex direction="column">
                        <Text size="1" mb="2" weight="bold" color="gray">
                            {t('ticket.seats.title')}
                        </Text>
                        {Object.entries(seats).map(([row, seats]) => (
                            <Text key={row} as="div" size="2" color="gray">
                                <Flex align="center" gap="2" justify="between">
                                    <Flex shrink="0">
                                        <Text>{t('ticket.row', { row })}</Text>
                                    </Flex>
                                    <Separator size="4" />
                                    <Flex shrink="0">
                                        <Text>
                                            {seats.length > 1
                                                ? t('ticket.seats', {
                                                    seat: seats.join(', '),
                                                })
                                                : t('ticket.seat', {
                                                    seat: seats[0],
                                                })}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Text>
                        ))}
                    </Flex>
                    <Card size="2" className={cls.qrCard}>
                        <QRCode
                            value={`EXT_${ticket.reservation_number}`}
                            bgColor="transparent"
                            fgColor="currentColor"
                            level="Q"
                            style={{
                                height: 'auto',
                                maxWidth: '100%',
                                minWidth: '100%',
                                display: 'block',
                            }}
                        />
                        <Card className={cls.qrLogo}>
                            <Logo className={cls.logo} />
                        </Card>
                    </Card>
                    <Text size="2" as="div" align="center" color="gray">
                        {ticket.reservation_number}
                    </Text>
                </Flex>
            </Inset>
        </>
    );
};

interface TicketProps {
    ticket: TicketType;
    onClick?: (ticket: TicketType) => void;
    noDecoration?: boolean;
}

export const Ticket: React.FC<TicketProps> = ({
    ticket,
    onClick,
    noDecoration,
}) => {
    const t = useI18n();
    const dateString = React.useMemo(() => {
        const d = new Date(ticket.date);

        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

        return format(new Date(d), 'dd.MM.yyyy • HH:mm');
    }, [ticket.date]);

    const showMore = (ticket.tickets?.length ?? 0) > 1;

    const { id } = ticket;

    const rotation = React.useMemo(
        () => ((id % 3) + 1) * (id % 2 === 0 ? -1 : 1),
        [id]
    );

    const handleClick = React.useCallback(() => {
        if (ticket.refunded || ticket.canceled) return;
        onClick?.(ticket);
    }, [onClick, ticket]);

    const movie = ticket.tickets?.[0];

    if (!movie) {
        return null;
    }

    const name = movie.movie_name;
    const poster = movie.poster;
    const cinema = movie.theatre;
    const hall = movie.hall_name;
    const seats = calulateSeats(ticket);

    const content = (
        <Flex asChild align="center" gap="4">
            <div className={cls.content}>
                <div
                    className={cls.poster}
                    data-radius="full"
                    style={{ backgroundImage: `url(${poster})` }}
                >
                    {ticket.refunded ? (
                        <div className={cls.refunded}>
                            <Text
                                weight="bold"
                                size={{ initial: '2', sm: '3' }}
                            >
                                {t('ticket.refund')}
                            </Text>
                        </div>
                    ) : null}
                </div>
                <Badge className={cls.time} color="gray">
                    {dateString}
                </Badge>
                <Flex className={cls.flex} grow="1" direction="column">
                    <Heading className={cls.noWrap} size="4">
                        {name}
                    </Heading>
                    <Text className={cls.noWrap} size="2" color="gray">
                        {hall} • {cinema}
                    </Text>
                    {seats ? (
                        <Separator my={{ initial: '1', xs: '2' }} size="2" />
                    ) : null}
                    {seats ? (
                        <Flex direction="column">
                            {Object.entries(seats).map(([row, seats]) => (
                                <Text key={row} as="div" size="2" color="gray">
                                    <Text>{t('ticket.row', { row })}</Text>
                                    <Text> • </Text>
                                    <Text>
                                        {seats.length > 1
                                            ? t('ticket.seats', {
                                                seat: seats.join(', '),
                                            })
                                            : t('ticket.seat', {
                                                seat: seats[0],
                                            })}
                                    </Text>
                                </Text>
                            ))}
                        </Flex>
                    ) : null}
                </Flex>
            </div>
        </Flex>
    );

    if (noDecoration) {
        return (
            <div data-no-decoration={true} className={cls.noDecoration}>
                {content}
            </div>
        );
    }

    return (
        <div className={cls.ticketRoot} data-refunded={ticket.refunded}>
            <button onClick={handleClick} className={cls.ticket}>
                {content}
            </button>
            {showMore && (
                <div
                    className={cls.ticket}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    data-fake={true}
                >
                    <div className={cls.content} />
                </div>
            )}
        </div>
    );
};

export const TicketSkeleton: React.FC<{ index?: number }> = ({ index = 1 }) => (
    <div
        className={cls.ticket}
        style={{ animationDelay: `${index * 100}ms` }}
        data-skeleton={true}
    >
        <div className={cls.content} />
    </div>
);