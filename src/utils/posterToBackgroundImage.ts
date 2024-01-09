export const posterToBackgroundImage = (poster: string) => {
    return `url("${encodeURI(poster)}")`;
};
