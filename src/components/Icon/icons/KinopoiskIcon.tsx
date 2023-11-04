import { BaseSvg, type IconProps } from '..';

export const KinopoiskIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <BaseSvg
        size={size}
        originalSize={32}
        {...props}
    >
        <path fill="currentColor" fillRule="evenodd" d="M10.14 5.01V11h.31L14.6 5h5.73l-7.64 6.91.31.32L27 5v5.03l-12.42 4.4v.3L27 13.64v4.72l-12.42-1.1v.32L27 21.98V27l-14-7.23-.32.31L20.32 27h-5.73l-4.14-5.97h-.31v5.97H6V5h4.14v.01Z" clipRule="evenodd"/>
    </BaseSvg>
);
