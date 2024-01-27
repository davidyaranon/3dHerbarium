import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'md-custom': '769px',
        '1xl': '1280px',
        '3xl': '1500px',
        '4xl': '2250px',
        '5xl': '3000px',
      },
      colors: {
        customGreen: '#69AA0E',
        customGreenHover: '#57900C',
        customBG: '#2F4858',
        primary: '#004C46',
        secondary: '#FFC72C'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("flowbite/plugin")
  ],
}
export default config
