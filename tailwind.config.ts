import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Dancing Script"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
