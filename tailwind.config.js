/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(71.17deg, #FEAF00 19.35%, #F8D442 90.12%)",
      },
      colors: {
        primary: "rgba(0, 0, 0, 1)",
        secondary: "rgba(108, 108, 108, 1)",
        customGray: "#E5E5E5",
        customyellow: "rgba(254, 175, 0, 1)",
        photoBackGround: "rgba(248, 248, 255, 1)",
        sidebarColor: "rgba(242, 234, 225, 1)",
        hoverCardBackGround: "rgba(242, 234, 225, 0.7)",
        productSpanColor: "rgba(128, 128, 128, 0.55)",
        editBorderColor: "rgba(229, 229, 229, 1)",
        anotherSidebarColor: "rgba(253, 253, 253, 1)",
      },
    },
  },
  plugins: [],
};
