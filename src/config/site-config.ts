interface SiteConfig {
    title: string;
    description: string;
    author: string;
    lang: string;
    locale: string;
    ogImage: string;
    logo: string;
}

// Astroでの環境変数の参照
const SITE_LANGUAGE = process.env.SITE_LANGUAGE || 'en';
const SITE_LOCALE = process.env.SITE_LOCALE || 'en_US';

export const siteConfig: SiteConfig = {
    title: 'AQZ Tech Chronicle',
    description: 'Technical blog for sharing IT development insights and knowledge',
    author: 'AQZ LLC',
    lang: SITE_LANGUAGE,
    locale: SITE_LOCALE,
    ogImage: '/assets/og-image.png',
    logo: '/assets/logo.svg'
};