import { Badge, Flex } from '@radix-ui/themes';

import type { FormattedGenresEntity } from '@src/server/kinokz/types';

import { translate } from '@src/locales/utils';

type BadgeProps = React.ComponentProps<typeof Badge>;

export const Genres: React.FC<{
  genres: FormattedGenresEntity[];
  locale?: string;
  full?: boolean;
  size?: BadgeProps['size'];
  variant?: BadgeProps['variant'];
  color?: BadgeProps['color'];
  highContrast?: BadgeProps['highContrast'];
}> = ({ genres, locale, full, size, variant = 'soft', color = 'gray', highContrast }) => {
    const visibleGenres = full ? genres : genres.slice(0, 1);
    const otherGenres = full ? [] : genres.slice(1);

    return (
        <Flex wrap="wrap" gap="2">
            {visibleGenres.map((genre) => (
                <Badge size={size} color={color} variant={variant} key={genre.id} highContrast={highContrast}>
                    {translate(genre.title, locale)}
                </Badge>
            ))}
            {otherGenres.length > 0 ? (
                <Badge size={size} color={color} variant={variant} highContrast={highContrast} key="other">
                    +{otherGenres.length}
                </Badge>
            ) : null}
        </Flex>
    );
};
