import { Rating as RatingBase, Star } from '@smastrom/react-rating';

const itemStyles = {
    itemShapes: Star,
    activeFillColor: 'var(--accent-9)',
    inactiveFillColor: 'var(--accent-a4)',
};

export const Rating: React.FC<{ rating: number }> = ({ rating }) => {
    const value = rating / 2; // 10 -> 5

    return (
        <RatingBase value={value} readOnly itemStyles={itemStyles} />
    );
};
