/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loginBgr:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/2916b9ca-8da5-461a-8c82-d60377763867/VN-vi-20220808-popsignuptwoweeks-perspective_alpha_website_small.jpg')",
      },
      backgroundColor: {
        bgPrimary: "#06121E",
      },
      textColor: {
        textPrimary: "#ffffff",
      },
    },
  },
  plugins: [],
};
