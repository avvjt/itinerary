
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#64748B",
        accent: "#FBBF24",
        grey:'#242424',

        light: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#F9FAFB",
          69:  "#ff0000",
        },
        dark: {
          100: "#1F2937",
          200: "#374151",
          300: "#111827",
        },
        red: {
          100: "#FEE2E2",
          200: "#FCA5A5",
          300: "#F87171",
        },
      },
      fontFamily: {
        customRegular: ["NationalPark-Regular"],       // for regular
        customBold: ["NationalPark-Bold"],
      },
    },
  },
  plugins: [],
 }