import { MagnifyingGlass, X } from '@phosphor-icons/react';
import {
    Button,
    Flex,
    Inset,
    ScrollArea,
    Separator,
    TextField,
} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCookies } from 'react-cookie';

import type { CityId } from '@src/constants/cities';

import { Empty } from '@src/components/Empty';
import { Modal } from '@src/components/Modal';
import { CITIES, CITY_COOKIE } from '@src/constants/cities';
import { useCurrentLocale, useI18n } from '@src/locales/client';
import { translate } from '@src/locales/utils';

interface CityContext {
  cityId: CityId;
  setCityId: (cityId: CityId) => void;
  openCityModal: () => void;
}

const cityContext = React.createContext<CityContext>({
    cityId: CITIES[0].id,
    setCityId: () => {},
    openCityModal: () => {},
});

export const CityProvider: React.FC<
  React.PropsWithChildren<{ initialValue: CityId }>
> = ({ children, initialValue }) => {
    const [cityId, setCityId] = React.useState<CityId>(initialValue);
    const [, setCookie] = useCookies();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        setCookie(CITY_COOKIE, cityId, { path: '/', httpOnly: false });
    }, [setCookie, cityId]);

    const handleCityIdChange = React.useCallback(
        (cityId: CityId) => {
            setCityId(cityId);
            setOpen(false);
            router.refresh();
        },
        [router]
    );

    const handleOpenCityModal = React.useCallback(() => {
        setOpen(true);
    }, []);

    const value = React.useMemo(
        () => ({
            cityId,
            setCityId: handleCityIdChange,
            openCityModal: handleOpenCityModal,
        }),
        [cityId, handleCityIdChange, handleOpenCityModal]
    );

    return (
        <cityContext.Provider value={value}>
            {children}
            <CityModal
                open={open}
                setOpen={setOpen}
                cityId={cityId}
                onCityChange={handleCityIdChange}
            />
        </cityContext.Provider>
    );
};

interface CityModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  cityId: CityId;
  onCityChange: (cityId: CityId) => void;
}

const CityModal: React.FC<CityModalProps> = ({
    open,
    setOpen,
    cityId,
    onCityChange,
}) => {
    const t = useI18n();
    const [search, setSearch] = React.useState('');
    const locale = useCurrentLocale();

    React.useEffect(() => {
        if (!open) {
            setSearch('');
        }
    }, [open]);

    const items = React.useMemo(() => {
        return CITIES.filter((city) => {
            return city.name[locale].toLowerCase().includes(search.toLowerCase());
        });
    }, [search, locale]);

    return (
        <Modal contentProps={{ size: '4' }} open={open} onOpenChange={setOpen}>
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
                                <MagnifyingGlass />
                            </TextField.Slot>
                            <TextField.Input
                                value={search}
                                placeholder={t('city.search')}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus={false}
                            />
                        </TextField.Root>
                        <Button variant="soft" color="gray" size="3" onClick={() => setOpen(false)}>
                            <X />
                        </Button>
                    </Flex>
                    <Separator size="4" />
                    <ScrollArea
                        style={{
                            flexGrow: 1
                        }}
                    >
                        <Flex gap="2" wrap="wrap" p="4">
                            {items.length === 0 && (
                                <Empty />
                            )}
                            {items.map((city) => (
                                <Button
                                    variant={cityId === city.id ? 'solid' : 'outline'}
                                    size="3"
                                    radius="full"
                                    key={city.id}
                                    onClick={() => onCityChange(city.id)}
                                >
                                    {translate(city.name, locale)}
                                </Button>
                            ))}
                        </Flex>
                    </ScrollArea>
                </Flex>
            </Inset>
        </Modal>
    );
};

export const useCity = () => {
    return React.useContext(cityContext);
};
