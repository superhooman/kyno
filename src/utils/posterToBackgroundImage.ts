import { EMPTY_POSTER } from '@src/constants/skeletons';

export const posterToBackgroundImage = (poster: string) => {
    return `url("${encodeURI(poster)}"), url(${EMPTY_POSTER})`;
};
