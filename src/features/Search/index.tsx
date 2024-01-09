import {
    Box,
    Button,
    Flex,
    Heading,
    Inset,
    ScrollArea,
    Separator,
    Text,
    TextField,
} from '@radix-ui/themes';
import React from 'react';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

import type { SearchResultItem } from '@src/server/kinokz/search/types';

import { search } from '@src/app/[locale]/actions/search';
import { Loader } from '@src/components/Loading';
import { Modal } from '@src/components/Modal';
import { Rating } from '@src/components/Rating';
import { useI18n } from '@src/locales/client';
import { Empty } from '@src/components/Empty';
import { makeHref } from '@src/constants/routes';
import { posterToBackgroundImage } from '@src/utils/posterToBackgroundImage';

import * as cls from './styles.css';


interface SearchResult {
  current: SearchResultItem[];
  past: SearchResultItem[];
}

export const Search = () => {
    const t = useI18n();
    const [open, setOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState<SearchResult | undefined>();

    React.useEffect(() => {
        if (!open) setSearchText('');
    }, [open]);

    // debounced searchText 300ms
    const searchQuery = useDebounce(searchText, 500);

    React.useEffect(() => {
        if (!searchQuery) return setResults(undefined);

        setIsLoading(true);
        search(searchQuery)
            .then((res) => setResults(res))
            .finally(() => setIsLoading(false));
    }, [searchQuery]);

    const trigger = (
        <Button className={cls.trigger} size="3" variant="soft" color="gray">
            <MagnifyingGlass />
            <Text className={cls.triggerText} size="2" mr="2">
                {t('search')}
            </Text>
        </Button>
    );

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleSearchChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
        },
        []
    );

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            contentProps={{ size: '4' }}
            trigger={trigger}
        >
            <Inset
                style={{
                    height:
            'calc(100% - var(--margin-top-override) - var(--margin-bottom-override))',
                }}
            >
                <Flex direction="column" height="100%">
                    <Flex p="4" direction="row" align="center" gap="4">
                        <TextField.Root style={{ flexGrow: 1 }} size="3">
                            <TextField.Slot>
                                {isLoading ? <Loader /> : <MagnifyingGlass />}
                            </TextField.Slot>
                            <TextField.Input
                                value={searchText}
                                placeholder={t('search')}
                                onChange={handleSearchChange}
                            />
                        </TextField.Root>
                        <Button onClick={handleClose} color="gray" variant="soft" size="3">
                            <X />
                        </Button>
                    </Flex>
                    {results ? <Separator size="4" /> : null}
                    <ScrollArea className={cls.scrollArea}>
                        {results ? (
                            <>
                                {results.current.length === 0 && results.past.length === 0 ? (
                                    <Empty />
                                ) : (
                                    <Flex direction="column" gap="4" p="4" className={cls.flex}>
                                        {results.current.length ? (
                                            <Heading size="4" as="h3">
                                                {t('movie.current')}
                                            </Heading>
                                        ) : null}
                                        {results.current.map((item) => (
                                            <MovieItem onClick={handleClose} key={item.id} {...item} />
                                        ))}
                                        {results.past.length ? (
                                            <Heading size="4" as="h3">
                                                {t('movie.past')}
                                            </Heading>
                                        ) : null}
                                        {results.past.map((item) => (
                                            <MovieItem onClick={handleClose} key={item.id} {...item} />
                                        ))}
                                    </Flex>
                                )}
                            </>
                        ) : null}
                    </ScrollArea>
                </Flex>
            </Inset>
        </Modal>
    );
};

const MovieItem: React.FC<{
  title: string;
  genre: string;
  poster: string;
  id: number;
  rating: number;
  onClick?: () => void;
}> = ({ title, poster, id, genre, rating, onClick }) => {
    const hasRating = rating > 0;

    return (
        <Link onClick={onClick} href={makeHref('movie', { params: { id } })}>
            <Flex align="center" gap="4" className={cls.itemRoot}>
                <Box
                    height="9"
                    width="9"
                    style={{
                        backgroundImage: posterToBackgroundImage(poster),
                    }}
                    className={cls.poster}
                />
                <Flex direction="column" className={cls.flex} gap="1">
                    <Flex direction="column" className={cls.flex}>
                        <Text className={cls.overflow} size="3" weight="bold">
                            {title}
                        </Text>
                        <Text className={cls.overflow} size="2" color="gray">
                            {genre}
                        </Text>
                    </Flex>
                    {hasRating ? (
                        <Box width="9">
                            <Rating rating={rating} />
                        </Box>
                    ) : null}
                </Flex>
            </Flex>
        </Link>
    );
    
};
