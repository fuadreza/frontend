/** @type {import('tailwindcss').Config} */
module.exports = {
    // Enable dark mode using class strategy
    darkMode: 'class',

    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
    ],

    theme: {
        extend: {
            // Add custom transitions for smooth theme switching
            transitionProperty: {
                'colors': 'background-color, border-color, color, fill, stroke',
            },
        },
    },

    plugins: [],
}
