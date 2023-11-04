'use client';

import React from 'react';
import { Button, Flex, Inset, ScrollArea, Text } from '@radix-ui/themes';

import * as cls from './styles.css';

interface CalendarRibbonProps {
  startDate: string;
  value: string;
  onChange: (value: string) => void;
  locale?: string;
  availableDates?: string[];
}

interface DayProps {
  date: Date;
  selected: boolean;
  onClick: (date: Date) => void;
  disabled?: boolean;
  locale: string;
}

const WEEK_DAYS = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    kk: ['Жк', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'],
};

const dateToValue = (date: Date) => {
    return date.toISOString().split('T')[0];
};

const Day: React.FC<DayProps> = ({
    date,
    selected,
    disabled,
    onClick,
    locale,
}) => {
    const weekDayIndex = date.getDay();
    const weekDay = WEEK_DAYS[locale as keyof typeof WEEK_DAYS][weekDayIndex];

    const handleClick = React.useCallback(() => {
        onClick(date);
    }, [onClick, date]);

    return (
        <Button
            variant={selected ? 'solid' : 'outline'}
            className={cls.day}
            onClick={handleClick}
            disabled={disabled}
        >
            <Flex direction="column" align="center">
                <Text weight="medium" size="1">
                    {weekDay}
                </Text>
                <Text weight="bold" size="2">
                    {date.getDate()}.{date.getMonth() + 1}
                </Text>
            </Flex>
        </Button>
    );
};

export const CalendarRibbon: React.FC<CalendarRibbonProps> = ({
    value,
    onChange,
    startDate,
    locale = 'ru',
    availableDates,
}) => {
    const dates = React.useMemo(() => {
    // get array of 7 days from startDate
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date);
        }

        return dates;
    }, [startDate]);

    const handleDateClick = React.useCallback(
        (date: Date) => {
            onChange(dateToValue(date));
        },
        [onChange]
    );

    return (
        <Inset mx="-4">
            <ScrollArea size="1" scrollbars="horizontal">
                <Flex width="max-content" shrink="0" px="4" gap="2" py="3">
                    {dates.map((date) => {
                        const dateValue = dateToValue(date);

                        return (
                            <Day
                                key={date.getTime()}
                                date={date}
                                disabled={availableDates && !availableDates.includes(dateValue)}
                                selected={dateValue === value}
                                onClick={handleDateClick}
                                locale={locale}
                            />
                        );
                    })}
                </Flex>
            </ScrollArea>
        </Inset>
    );
};
