import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const CITIES = [
    {
        'id': 1,
        'name': {
            'en': 'Astana',
            'ru': 'Астана',
            'kk': 'Астана'
        },
        'name_lat': 'Astana',
        'time_zone': 0,
        'latitude': 51.143969,
        'longitude': 71.435801,
        'order': 0
    },
    {
        'id': 2,
        'name': {
            'en': 'Almaty',
            'ru': 'Алматы',
            'kk': 'Алматы'
        },
        'name_lat': 'Almaty',
        'time_zone': 0,
        'latitude': 43.238293,
        'longitude': 76.945465,
        'order': 1
    },
    {
        'id': 3,
        'name': {
            'en': 'Aktau',
            'ru': 'Актау',
            'kk': 'Ақтау'
        },
        'name_lat': 'Aktau',
        'time_zone': -1,
        'latitude': 43.635379,
        'longitude': 51.169135,
        'order': 4
    },
    {
        'id': 4,
        'name': {
            'en': 'Aktobe',
            'ru': 'Актобе',
            'kk': 'Ақтөбе'
        },
        'name_lat': 'Aktobe',
        'time_zone': -1,
        'latitude': 50.300371,
        'longitude': 57.154555,
        'order': 5
    },
    {
        'id': 83,
        'name': {
            'en': 'Alakol',
            'ru': 'Алаколь',
            'kk': 'Алакөл'
        },
        'name_lat': 'Alakol',
        'time_zone': 0,
        'latitude': 0,
        'longitude': 0,
        'order': 6
    },
    {
        'id': 5,
        'name': {
            'en': 'Atyrau',
            'ru': 'Атырау',
            'kk': 'Атырау'
        },
        'name_lat': 'Atyrau',
        'time_zone': -1,
        'latitude': 47.106615,
        'longitude': 51.91338,
        'order': 8
    },
    {
        'id': 6,
        'name': {
            'en': 'Balkhash',
            'ru': 'Балхаш',
            'kk': 'Балқаш'
        },
        'name_lat': 'Balkhash',
        'time_zone': 0,
        'latitude': 46.839326,
        'longitude': 74.983356,
        'order': 9
    },
    {
        'id': 23,
        'name': {
            'en': 'Zhanaozen',
            'ru': 'Жанаозен',
            'kk': 'Жаңаөзен'
        },
        'name_lat': 'Zhanaozen',
        'time_zone': -1,
        'latitude': 43.343266,
        'longitude': 52.865792,
        'order': 12
    },
    {
        'id': 40,
        'name': {
            'en': 'Zhezkazgan',
            'ru': 'Жезказган',
            'kk': 'Жезқазған'
        },
        'name_lat': 'Zhezkazgan',
        'time_zone': 0,
        'latitude': 47.79025,
        'longitude': 67.710714,
        'order': 14
    },
    {
        'id': 7,
        'name': {
            'en': 'Karaganda',
            'ru': 'Караганда',
            'kk': 'Қарағанды'
        },
        'name_lat': 'Karaganda',
        'time_zone': 0,
        'latitude': 49.807754,
        'longitude': 73.088504,
        'order': 17
    },
    {
        'id': 20,
        'name': {
            'en': 'Kokshetau',
            'ru': 'Кокшетау',
            'kk': 'Көкшетау'
        },
        'name_lat': 'Kokshetau',
        'time_zone': 0,
        'latitude': 53.284635,
        'longitude': 69.377527,
        'order': 18
    },
    {
        'id': 90,
        'name': {
            'en': 'Konaev',
            'ru': 'Конаев',
            'kk': 'Қонаев'
        },
        'name_lat': 'Konaev',
        'time_zone': 0,
        'latitude': 43.875322,
        'longitude': 77.058954,
        'order': 20
    },
    {
        'id': 8,
        'name': {
            'en': 'Kostanay',
            'ru': 'Костанай',
            'kk': 'Қостанай'
        },
        'name_lat': 'Kostanay',
        'time_zone': 0,
        'latitude': 53.21448,
        'longitude': 63.632073,
        'order': 22
    },
    {
        'id': 9,
        'name': {
            'en': 'Kyzylorda',
            'ru': 'Кызылорда',
            'kk': 'Қызылорда'
        },
        'name_lat': 'Kyzylorda',
        'time_zone': -1,
        'latitude': 44.842557,
        'longitude': 65.502545,
        'order': 25
    },
    {
        'id': 10,
        'name': {
            'en': 'Pavlodar',
            'ru': 'Павлодар',
            'kk': 'Павлодар'
        },
        'name_lat': 'Pavlodar',
        'time_zone': 0,
        'latitude': 52.285577,
        'longitude': 76.940947,
        'order': 26
    },
    {
        'id': 11,
        'name': {
            'en': 'Petropavlovsk',
            'ru': 'Петропавловск',
            'kk': 'Петропавл'
        },
        'name_lat': 'Petropavlovsk',
        'time_zone': 0,
        'latitude': 54.865472,
        'longitude': 69.135602,
        'order': 27
    },
    {
        'id': 88,
        'name': {
            'en': 'Ridder',
            'ru': 'Риддер',
            'kk': 'Риддер'
        },
        'name_lat': 'Ridder',
        'time_zone': 0,
        'latitude': 50.33886,
        'longitude': 83.506329,
        'order': 28
    },
    {
        'id': 28,
        'name': {
            'en': 'Rudnyi',
            'ru': 'Рудный',
            'kk': 'Рудный'
        },
        'name_lat': 'Rudnyi',
        'time_zone': 0,
        'latitude': 52.964432,
        'longitude': 63.133392,
        'order': 30
    },
    {
        'id': 12,
        'name': {
            'en': 'Semey',
            'ru': 'Семей',
            'kk': 'Семей'
        },
        'name_lat': 'Semey',
        'time_zone': 0,
        'latitude': 50.416526,
        'longitude': 80.25617,
        'order': 32
    },
    {
        'id': 89,
        'name': {
            'en': 'Stepnogorsk',
            'ru': 'Степногорск',
            'kk': 'Степногорск'
        },
        'name_lat': 'Stepnogorsk',
        'time_zone': 0,
        'latitude': 52.35183,
        'longitude': 71.88528,
        'order': 33
    },
    {
        'id': 13,
        'name': {
            'en': 'Taldykorgan',
            'ru': 'Талдыкорган',
            'kk': 'Талдықорған'
        },
        'name_lat': 'Taldykorgan',
        'time_zone': 0,
        'latitude': 45.017837,
        'longitude': 78.382096,
        'order': 34
    },
    {
        'id': 49,
        'name': {
            'en': 'Talgar',
            'ru': 'Талгар',
            'kk': 'Талғар'
        },
        'name_lat': 'Talgar',
        'time_zone': 0,
        'latitude': 43.304539,
        'longitude': 77.239658,
        'order': 35
    },
    {
        'id': 14,
        'name': {
            'en': 'Taraz',
            'ru': 'Тараз',
            'kk': 'Тараз'
        },
        'name_lat': 'Taraz',
        'time_zone': 0,
        'latitude': 42.901183,
        'longitude': 71.378309,
        'order': 36
    },
    {
        'id': 15,
        'name': {
            'en': 'Temirtau',
            'ru': 'Темиртау',
            'kk': 'Теміртау'
        },
        'name_lat': 'Temirtau',
        'time_zone': 0,
        'latitude': 50.058756,
        'longitude': 72.953424,
        'order': 37
    },
    {
        'id': 47,
        'name': {
            'en': 'Turkestan',
            'ru': 'Туркестан',
            'kk': 'Түркістан'
        },
        'name_lat': 'Turkestan',
        'time_zone': 0,
        'latitude': 43.301986,
        'longitude': 68.270345,
        'order': 38
    },
    {
        'id': 16,
        'name': {
            'en': 'Oral',
            'ru': 'Уральск',
            'kk': 'Орал'
        },
        'name_lat': 'Oral',
        'time_zone': -1,
        'latitude': 51.20398,
        'longitude': 51.370375,
        'order': 40
    },
    {
        'id': 17,
        'name': {
            'en': 'Oskemen',
            'ru': 'Усть-Каменогорск',
            'kk': 'Өскемен'
        },
        'name_lat': 'Oskemen',
        'time_zone': 0,
        'latitude': 49.948759,
        'longitude': 82.628459,
        'order': 41
    },
    {
        'id': 18,
        'name': {
            'en': 'Shymkent',
            'ru': 'Шымкент',
            'kk': 'Шымкент'
        },
        'name_lat': 'Shymkent',
        'time_zone': 0,
        'latitude': 42.315514,
        'longitude': 69.586907,
        'order': 42
    },
    {
        'id': 22,
        'name': {
            'en': 'Shchuchinsk',
            'ru': 'Щучинск',
            'kk': 'Щучинск'
        },
        'name_lat': 'Shchuchinsk',
        'time_zone': 0,
        'latitude': 52.942107,
        'longitude': 70.210131,
        'order': 43
    },
    {
        'id': 82,
        'name': {
            'en': 'Fort-Shevchenko',
            'ru': 'Форт-Шевченко',
            'kk': 'Форт-Шевченко'
        },
        'name_lat': 'Fort-Shevchenko',
        'time_zone': -1,
        'latitude': 44.507463,
        'longitude': 50.262833,
        'order': 44
    },
    {
        'id': 19,
        'name': {
            'en': 'Ekibastuz',
            'ru': 'Экибастуз',
            'kk': 'Екібастұз'
        },
        'name_lat': 'Ekibastuz',
        'time_zone': 0,
        'latitude': 51.729692,
        'longitude': 75.32662,
        'order': 45
    }
] as const;

export type CityId = typeof CITIES[number]['id'];
export type CityName = typeof CITIES[number]['name'];

export const cityIdToCityName = (id: CityId) => {
    const city = CITIES.find(c => c.id === id);
    if (!city) {
        throw new Error(`Invalid city id: ${id}`);
    }
    return city.name;
};

export const findCity = (city?: string) => {
    return (CITIES.find(c => c.name.en.toLocaleLowerCase() === city?.toLocaleLowerCase()))?.id;
};

export const CITY_COOKIE = 'city';

export const getCityId = (cookies?: RequestCookies | ReadonlyRequestCookies, geo?: string, fallback?: CityId): CityId => {
    const cookieValue = Number(cookies?.get(CITY_COOKIE)?.value);
    const cityIdFromCookie = Number.isNaN(cookieValue) ? undefined : CITIES.find(({ id }) => id === cookieValue)?.id;
    const cityIdFromGeo = findCity(geo);

    return cityIdFromCookie ?? cityIdFromGeo ?? fallback ?? CITIES[0].id;
};

export const getCityIdFromParam = (param?: string): CityId | undefined => {
    const paramValue = Number(param);
    const cityIdFromParam = Number.isNaN(paramValue) ? undefined : CITIES.find(({ id }) => id === paramValue)?.id;

    return cityIdFromParam;
};
