/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], 
        // ... другие настройки шрифтов ...
      },
      colors: {
        "bg-color": "rgba(245, 249, 255, 1)",
        "button-color": "rgba(119, 170, 249, 1)",
        "blue-border": "rgba(89, 154, 254, 1)",
        "blue-text": "rgba(62, 134, 245, 1)",
        "grey-text": "rgba(176, 176, 176, 1)",
        "red-text": "rgba(255, 136, 136, 1)",
        "grey-container" : "rgba(244, 244, 244, 1)",
        "skeleton-main" : "rgba(218, 233, 255, 1)",
        "crm-main" : "rgba(94, 220, 145, 1)",
        "crm-link" : "rgba(58, 185, 109, 1)",
        "crm-fade" : "rgba(193, 249, 215, 1)",
        "text-faded-dark" : "rgba(125, 125, 125, 1)",
        "green-indicator" : "rgba(104, 226, 153, 1)",
        "gray-indicator" : "rgba(220, 220, 220, 1)"
      },
    },
  },
  plugins: [],
};
