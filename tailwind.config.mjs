/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class", // ダークモードサポート
  theme: {
    extend: {
      // 必要になった時点で拡張する
    },
  },
  plugins: [], // 必要なプラグインも後から追加
};
