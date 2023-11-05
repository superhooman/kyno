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

            if (value > 1) {
                stars.push(<Star key={i} value={1} />);
            } else if (value > 0) {
                stars.push(<Star key={i} value={value} />);
            } else {
                stars.push(<Star key={i} value={0} />);
            }
        }

        return stars;
    }, [rating]);

    return <div className={cls.root}>{stars}</div>;
};

const Star: React.FC<{ value: number }> = ({ value }) => {
    const id = React.useId();
    const isHalf = value > 0 && value < 1;

    return (
        <div className={cls.star}>
            <svg className={cls.star} data-filled={value !== 0} viewBox={VIEW_BOX}>
                {isHalf && (
                    <defs>
                        <linearGradient id={id}>
                            <stop className={cls.stop1} offset="50%" />
                            <stop className={cls.stop2} offset="50%" />
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
