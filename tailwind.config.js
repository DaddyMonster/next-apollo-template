module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#B380AA",
        secondary: "#61A0AF",
        success: "#bcd979",
        warning: "#f5d491",
        danger: "#f06c9b",
        default: "#D2D9DA",
        black: "#293132",
        info: "#96C9DC",
      },
      fontFamily: {
        logo: ["S-CoreDream-9Black", "Roboto"],
        menu: ["GmarketSansBold", "Roboto"],
        guide: ["GmarketSansMedium", "Roboto"],
        text: ["GmarketSansLight", "Roboto"],
        pen: ["KyoboHand", "Roboto"],
        pretty: ["S-CoreDream-2ExtraLight", "Roboto"],
        pretty2: ["Open Sans Condensed", "Roboto"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
