module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        heading: ["Roboto", "sans-serif"],
      },
      colors: {
        boxcolor: "#98ccd3",
      },
    },
  },
  plugins: [],
};
