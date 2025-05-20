/** @type {import('tailwindcss').Config} */
module.exports = {
  // 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Common for Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Common for Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Your UI components
   
  ],
  theme: {
    extend: {
      // Define your custom colors here using CSS variables from index.css
      colors: {
        // Your custom input success background
        'input-sucess': 'var(--input-sucess)',
        // Your custom input text color
        'input-text': 'var(--input-text)',
        // Map your @theme colors for use as Tailwind utilities
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'card': 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'popover': 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        'primary': 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        'secondary': 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        'muted': 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        'accent': 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        'destructive': 'var(--destructive)',
        'border': 'var(--border)',
        'input': 'var(--input)',
        'ring': 'var(--ring)',
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
        'sidebar': 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
        'input-primary': 'var(--input-primary)', // Assuming this is distinct from --input
        'blue-primary': 'var(--color-blue-primary)', // From your @theme block
      },
      // Extend borderRadius to use your custom radius variables
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'lato': ['var(--font-lato)', 'sans-serif'],
        'lusitana': ['var(--font-lusitana)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};