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
        buttonSecondary: "var(--color-btn-secondary)",
        cardBgPrimary: "var(--color-background-card)",
        btnPrimaryHover:"var(--color-btn-primary-hover)",
        btnSecondaryHover: "var(--color-btn-secondary-hover)",
        headerCol: "var(--color-header)",
        textColPrimary: "var(--color-text-primary)",
        textColSecondary : "var(--color-text-secondary)",
        secondaryBadgeCol: "var(--color-badge-secondary)",
        iconFillCol: "var(--color-icon-fill)"
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

