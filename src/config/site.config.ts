export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    image: string;
    twitterHandle: string;
    author: {
        name: string;
        url: string;
        avatar: string;
    };
    themeColor: string;
    lang: string;
    locale: string;
    ogImage: string;
    logo: string;
}

const siteConfig: SiteConfig = {
    name: "AQZ Tech Chronicle",
    title: "AQZ Tech Chronicle - Technical Blog",
    description: "Technical blog for sharing IT development insights and knowledge",
    image: "/social-card.png",
    twitterHandle: "@aqztech",
    author: {
        name: "Saito",
        url: "https://github.com/aqz-tech",
        avatar: "/avatar.png"
    },
    themeColor: "#3b82f6",
    // Additional settings
    lang: "en",
    locale: "en_US",
    ogImage: "/social-card.png",
    logo: "/logo.svg"
};

export default siteConfig;