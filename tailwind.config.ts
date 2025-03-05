import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        {
            pattern: /^grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern: /^grid-rows-(1|2|3|4|5|6)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern: /^float-(left|right|none)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern: /^w-(1\/2|1\/3|2\/3|1\/4|3\/4|full)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern: /^m-(0|1|2|3|4|5|6|7|8|9|10|11|12)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern: /^p-(0|1|2|3|4|5|6|7|8|9|10|11|12)$/,
            variants: ["sm", "md", "lg"],
        },
        {
            pattern:
                /^bg-(background|foreground|card|primary|secondary|muted|accent|destructive|success)$/,
        },
        {
            pattern:
                /^text-(foreground|card-foreground|primary-foreground|secondary-foreground|muted-foreground|accent-foreground|destructive-foreground|success-foreground)$/,
        },
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
