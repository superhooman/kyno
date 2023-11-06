import React from 'react';

import * as cls from './styles.css';
import { SYMBOL, VIEW_BOX } from './symbol';

interface Props {
    rating: number;
}

export const Stars: React.FC<Props> = ({ rating }) => {
    const stars = React.useMemo(() => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            const value = rating - i;

            stars.push(<Star value={value} />);
        }

        return stars;
    }, [rating]);

    return <div className={cls.root}>{stars}</div>;
};

const LOWER_BOUND = 0.25;
const UPPER_BOUND = 0.9;

const Star: React.FC<{ value: number }> = ({ value }) => {
    const id = React.useId();
    const isHalf = value > LOWER_BOUND && value < UPPER_BOUND;
    const percent = Math.round((1 - value) * 100) + '%';

    return (
        <div className={cls.star}>
            <svg className={cls.star} data-filled={value >= UPPER_BOUND} viewBox={VIEW_BOX}>
                {isHalf && (
                    <defs>
                        <linearGradient id={id}>
                            <stop className={cls.stop1} offset={percent} />
                            <stop className={cls.stop2} offset={percent} />
                        </linearGradient>
                    </defs>
                )}
                <g shapeRendering="geometricPrecision" fill={isHalf ? `url('#${id}')` : undefined}>
                    <use xlinkHref={`#${SYMBOL}`} />
                </g>
            </svg>
        </div>
    );
};
