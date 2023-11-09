import type { FormattedCinemaResult } from '@src/server/kinokz/movie/types';

interface Props {
    cinemas: FormattedCinemaResult[];
}

export const Cinemas: React.FC<Props> = ({ cinemas }) => {
    return (
        <div>
            {cinemas.map((cinema) => (
                <div key={cinema.id}>
                    {cinema.name}
                </div>
            ))}
        </div>
    );
};
