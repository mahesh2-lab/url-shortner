/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        lobster: ["Lobster", "serif"],
        proxima: ['Proxima Nova', 'sans-serif'],
        proximabold: ['Proxima Nova Bold', 'sans-serif'],
        proximasemibold: ['Proxima Nova Semibold', 'sans-serif'],
        proximalight: ['Proxima Nova Light', 'sans-serif'],
        proximaregular: ['Proxima Nova Regular', 'sans-serif'],
        proximathin: ['Proxima Nova Thin', 'sans-serif'],
        proximaextrabold: ['Proxima Nova Extrabold', 'sans-serif'],

      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
