interface Props extends React.ComponentProps<'svg'> {
    size?: number;
}

export const Logo: React.FC<Props> = ({ size = 40, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M47 40h49v176H47V40ZM147 114h-40v40l63 63h40v-40l-63-63ZM147 114V74h40v40h-40Z"
        />
    </svg>
);
