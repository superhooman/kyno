import type { IconProps } from '..';

export const FdxIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <svg width="auto" height={size} viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M112.1 42c.3.6.4 1.4.4 2.1V163a2 2 0 0 1-2 2h-22a2 2 0 0 1-2-2v-22H1a1 1 0 0 1-1-1v-26c0-.6.3-1.2.8-1.6l99.8-73.6a8 8 0 0 1 5.4-1.5h.5a6.6 6.6 0 0 1 5.6 4.5v.1ZM86.5 78.4V118H35.1a1 1 0 0 1-.6-1.8l52-37.7ZM137 41a3 3 0 0 0-3 3v97a3 3 0 0 0 3 3h61.5c16.2-2.2 48.5-15.8 48.5-53s-32.3-48.8-48.5-50H137Zm25 22.5a3 3 0 0 0-3 3V118a3 3 0 0 0 3 3h34.5A28 28 0 0 0 223 91.5c0-22.4-17.7-28-26.5-28H162Z"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M465.3 3.4a2 2 0 0 0-1.5-3.4h-53a2 2 0 0 0-1.4.5l-66 61.5a2 2 0 0 1-2.7 0l-38.6-35a2 2 0 0 0-1.4-.5h-53.3a2 2 0 0 0-1.4 3.4l44.4 43.5c.4.4.9.6 1.4.6h33.6a2 2 0 0 1 1.4 3.5l-94 87.5a2 2 0 0 0 1.3 3.5h72a2 2 0 0 0 1.5-.6l34.6-36.1a2 2 0 0 1 2.9 0l66.3 67.1c.4.4.9.6 1.4.6h81.8a2 2 0 0 0 1.3-3.5L400 114.5a2 2 0 0 0-1.3-.5h-34.9a2 2 0 0 1-1.4-3.4L465.3 3.4Z"
        />
    </svg>
);
