import { Badge, Flex, Tooltip } from '@radix-ui/themes';

import type { FormattedGenresEntity } from '@src/server/kinokz/types';

import { translate } from '@src/locales/utils';

export const Genres: React.FC<{
  genres: FormattedGenresEntity[];
  locale?: string;
  full?: boolean;
}> = ({ genres, locale, full }) => {
    const visibleGenres = full ? genres : genres.slice(0, 1);
    const otherGenres = full ? [] : genres.slice(1);

    const tooltip = otherGenres
        .map((genre) => translate(genre.title, locale))
        .join(', ');

    return (
        <Flex wrap="wrap" gap="2">
            {visibleGenres.map((genre) => (
                <Badge color="gray" variant="soft" key={genre.id}>
                    {translate(genre.title, locale)}
                </Badge>
            ))}
            {otherGenres.length > 0 ? (
                <Tooltip side="bottom" content={tooltip}>
                    <Badge color="gray" variant="soft" key="other">
            +{otherGenres.length}
                    </Badge>
                </Tooltip>
            ) : null}
        </Flex>
    );
};
