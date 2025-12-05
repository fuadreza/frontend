/** @type {import('tailwindcss').Config} */
module.exports = {
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
            transitionProperty: {
                'colors': 'background-color, border-color, color, fill, stroke',
            },
        },
    },

    plugins: [],
}
