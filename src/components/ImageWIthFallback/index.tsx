/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface ImageWithFallbackProps extends React.ComponentProps<'img'> {
    src: string;
    fallbackSrc: string;
    fill?: boolean;
}

export const ImageWithFallback = React.forwardRef<HTMLImageElement, ImageWithFallbackProps>(
    ({ src, fallbackSrc, alt, fill, ...props }, ref) => {
        const [imgSrc, setImgSrc] = React.useState<string>(src);

        const handleError = React.useCallback(() => {
            if (imgSrc !== fallbackSrc) {
                setImgSrc(fallbackSrc);
            }
        }, [fallbackSrc, imgSrc]);
    
        return (
            <img
                {...props}
                alt={alt}
                src={imgSrc}
                onError={handleError}
                ref={ref}
                style={{
                    ...(fill ? { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' } : {}),
                    ...props.style
                }}
            />
        );
    }
);

ImageWithFallback.displayName = 'ImageWithFallback';
