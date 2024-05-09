/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        bgColorSidebar: "var(--color-background-sidebar)",
        baseBgCol: "var(--color-background-base)",
        buttonPrimary: "var(--color-button-primary)",
        cardBgPrimary: "var(--color-button-primary)",
        btnPrimaryHover:"var(--color-btn-primary-hover)",
        headerCol: "var(--color-header)",
        primaryTextCol: "var(--color-primary-text)",
        secondaryTextCol : "var(--color-secondary-text)",
        secondaryBadgeCol: "var(--color-badge-secondary)",

        textColPrimary: "var(--color-text-primary)",
      }
    },
  //   fontFamily: {
  //     'body': [
  //   'Inter', 
  //   'ui-sans-serif', 
  //   'system-ui', 
  //   '-apple-system', 
  //   'system-ui', 
  //   'Segoe UI', 
  //   'Roboto', 
  //   'Helvetica Neue', 
  //   'Arial', 
  //   'Noto Sans', 
  //   'sans-serif', 
  //   'Apple Color Emoji', 
  //   'Segoe UI Emoji', 
  //   'Segoe UI Symbol', 
  //   'Noto Color Emoji'
  // ],
  //     'sans': [
  //   'Inter', 
  //   'ui-sans-serif', 
  //   'system-ui', 
  //   '-apple-system', 
  //   'system-ui', 
  //   'Segoe UI', 
  //   'Roboto', 
  //   'Helvetica Neue', 
  //   'Arial', 
  //   'Noto Sans', 
  //   'sans-serif', 
  //   'Apple Color Emoji', 
  //   'Segoe UI Emoji', 
  //   'Segoe UI Symbol', 
  //   'Noto Color Emoji'
  // ]
  //   }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
  
}

