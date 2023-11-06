'use client';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

import { THEME_COOKIE_NAME, Theme } from '@src/constants/theme';

interface ThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const themeContext = React.createContext<ThemeContext>({
    theme: Theme.System,
    setTheme: () => { },
});

const MEDIA = '(prefers-color-scheme: dark)';

const applyTheme = (theme: Theme) => {
    if (theme === Theme.System) {
        return;
    }

    const html = document.documentElement;
    const classList = html.classList;
    classList.remove(Theme.Dark, Theme.Light, Theme.System);

    classList.add(theme);
    html.style.colorScheme = theme;
};

export const ThemeProvider: React.FC<React.PropsWithChildren<{ theme: Theme }>> = ({ children, theme }) => {
    const [currentTheme, setTheme] = React.useState<Theme>(theme);
    const themeRef = React.useRef<Theme>(theme);
    const [, setCookie] = useCookies();

    const router = useRouter();

    const handleMediaQuery = React.useCallback(
        (media: MediaQueryList | MediaQueryListEvent) => {
            if (themeRef.current !== Theme.System) {
                return;
            }
            if (media.matches) {
                applyTheme(Theme.Dark);
            } else {
                applyTheme(Theme.Light);
            }
        },
        []
    );

    React.useEffect(() => {
        // add listener for system theme change
        const media = window.matchMedia(MEDIA);

        // Intentionally use deprecated listener methods to support iOS & old browsers
        media.addListener(handleMediaQuery);
        handleMediaQuery(media);

        return () => media.removeListener(handleMediaQuery);
    }, [theme, handleMediaQuery]);

    const handleThemeChange = React.useCallback(
        (newTheme: Theme) => {
            themeRef.current = newTheme;
            setTheme(newTheme);
            setCookie(THEME_COOKIE_NAME, newTheme, { path: '/', httpOnly: false });
            router.refresh();
            
            if (newTheme !== Theme.System) {
                applyTheme(newTheme);
            } else {
                const media = window.matchMedia(MEDIA);
                handleMediaQuery(media);
            }
        },
        [setCookie, handleMediaQuery, router]
    );

    const value = React.useMemo(() => ({ theme: currentTheme, setTheme: handleThemeChange }), [currentTheme, handleThemeChange]);

    return (
        <themeContext.Provider value={value}>
            <ThemeScript theme={theme} />
            {children}
        </themeContext.Provider>
    );
};

const ThemeScript = React.memo(
    ({ theme }: { theme: Theme }) => {  
        // Code-golfing the amount of characters in the script
        const optimization = (() => {
            const removeClasses = `c.remove(${Object.values(Theme).map((t: string) => `'${t}'`).join(',')})`;
  
            return `var d=document.documentElement,c=d.classList;${removeClasses};`;
        })();
  
        const updateDOM = (name: string) => {
            return `d.style.colorScheme = '${name}';c.add('${name}');`;
        };
  
        const scriptSrc = (() => {
            if (theme !== Theme.System) {
                return `!function(){${optimization}${updateDOM(theme)}}()`;
            }
  
            return `!function(){try{${optimization};var t='${MEDIA}',m=window.matchMedia(t);if(m.matches){${updateDOM(
                'dark'
            )}}else{${updateDOM('light')}}
        }catch(e){}}()`;
        })();
  
        return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />;
    },
    // Never re-render this component
    () => true
);

ThemeScript.displayName = 'ThemeScript';

export const useTheme = () => {
    const { theme, setTheme } = React.useContext(themeContext);

    return { theme, setTheme };
};
