import { BaseSvg, type IconProps } from '..';

export const KinoKzIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <BaseSvg
        size={size}
        originalSize={32}
        {...props}
    >
        <path fill="currentColor" d="M22.4 10c-3 0-5.7 2-6.4 4.9A6.6 6.6 0 0 0 9.6 10C6 10 3 13 3 16.5 3 20.1 6 23 9.6 23c3 0 5.7-2 6.4-4.9a6.6 6.6 0 0 0 6.4 4.9c3.6 0 6.6-3 6.6-6.5 0-3.6-3-6.5-6.6-6.5Z"/>
    </BaseSvg>
);
