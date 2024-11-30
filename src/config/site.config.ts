type SocialPlatforms = {
  linkedin?: string;
  devto?: string;
  x?: string;        // twitterをxに変更
  facebook?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
};

export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    image: string;
    twitterHandle: string;  // 注: メタタグとの互換性のために残す
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
    social: SocialPlatforms;
    siteUrl: string;  // Add siteUrl to the interface
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
    logo: "/logo.svg",
    social: {
        linkedin: "https://www.linkedin.com/in/aqz-saito",
        devto: "https://dev.to/roboword",
        github: "https://github.com/aqz-saito",
        // Add as needed
        // x: "https://x.com/username",  // twitter → x
        // facebook: "https://facebook.com/username",
        // instagram: "https://instagram.com/username",
    },
    siteUrl: 'https://example.com'  // あなたのサイトのURLに変更してください
} as const;

export default siteConfig;