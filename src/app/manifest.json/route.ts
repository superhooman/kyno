import { resolveLocale } from '@src/utils/resolveLocale';

export const dynamic = 'force-dynamic';

export async function GET() {
    const locale = resolveLocale();

    return Response.json({
        'name': 'kyno',
        'short_name': 'kyno',
        'start_url': `/${locale}`,
        'icons': [
            {
                'src': '/icons/android-chrome-192x192.png',
                'sizes': '192x192',
                'type': 'image/png'
            },
            {
                'src': '/icons/android-chrome-512x512.png',
                'sizes': '512x512',
                'type': 'image/png'
            },
            {
                'src': '/icons/apple-touch-icon.png',
                'sizes': '180x180',
                'type': 'image/png',
                'purpose': 'any maskable'
            }
        ],
        'theme_color': '#121113',
        'background_color': '#121113',
        'display': 'standalone'
    });
}

export const runtime = 'edge';
