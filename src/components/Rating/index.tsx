import { Stars } from '../Stars';

export const Rating: React.FC<{ rating: number }> = ({ rating }) => {
    const value = rating / 2; // 10 -> 5

    return (
        <Stars rating={value} />
    );
};
