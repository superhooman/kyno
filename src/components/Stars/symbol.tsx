import { VisuallyHidden } from '@radix-ui/themes';

export const SYMBOL = 'rating-star';
export const VIEW_BOX = '0 0 25 23.81';

export const StarSymbol: React.FC = () => {
    return (
        <VisuallyHidden>
            <svg viewBox={VIEW_BOX}>
                <symbol id={SYMBOL}>
                    <polygon points="25 9.02 16.4 7.75 12.46 0 8.59 7.79 0 9.14 6.21 15.23 4.85 23.81 12.55 19.79 20.3 23.74 18.85 15.17 25 9.02" />
                </symbol>
                <use xlinkHref={`#${SYMBOL}`} />
            </svg>
        </VisuallyHidden>
    );
};
