import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#ffffff",
                gold: {
                    500: "#d4af37",
                    600: "#b5952f",
                }
            },
        },
    },
    plugins: [],
};
export default config;
