/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "2lg":"1200px",
        "3xl":"1980px",
      },
      colors: {
        primary: "#f6f3ed",
        background: "#101010",
        "transparent-background": "rgba(#101010,.5)",
        "background-2": "#eab651",
        "transparent-background-2": "rgba(0,0,0, .5)",
      },
      gridTemplateColumns: {
        custom: "2fr 3fr",
      },
      backgroundImage: {
        "image-1": "url('/assets/about-1.svg')",
        "image-2":
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKQEjXSyagYPm1iQ7byrepH437cjQcnlxNg&usqp=CAU')",
        "image-3":
          "url('https://uploads-ssl.webflow.com/6124ca98ab8529f670240532/6124ca98ab85290b112405c4_satellite.jpg')",
        "image-4": "url('/images/rotate-phone.jpg')",
        "image-5": "url('/images/logo-2.png')",
        "image-6": "url('/images/about-image-1.jpeg')",
      },
      gradientColorStops: {
        'fast-forward': ["transparent","rgba(0,0,0,.8)"]
      },
      clipPath: {
        'triangle': "polygon(0 0, 0% 100%, 100% 50%)",
        'circle': "circle(25% at 50% 50%)"
      },
    },
  },
  plugins: [],
};
