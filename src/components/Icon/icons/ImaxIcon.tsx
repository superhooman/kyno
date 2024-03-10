import type { IconProps } from '..';

export const ImaxIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <svg width="auto" height={size} viewBox="0 0 978 188" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M155 188V52h11l66 136h45l67-136h11v136h53V0h-96l-57 113L197 0h-95v188h53ZM0 188h60V0H0v188ZM515 0l-96 188h63l17-32h119l17 32h64L603 0h-88Zm47 43h-6l-37 71h79l-36-71ZM790 0h-75l75 88-89 100h79l60-68 60 68h78L890 88l74-88h-73l-51 61-50-61Z"
        />
    </svg>
);
