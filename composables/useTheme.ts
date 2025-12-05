import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

// Global state untuk theme (shared across components)
const theme = ref<Theme>('light')
const isInitialized = ref(false)

export const useTheme = () => {
    /**
     * Initialize theme dari localStorage atau system preference
     */
    const initTheme = () => {
        if (isInitialized.value) return

        // Hanya jalankan di client-side (browser)
        if (import.meta.client) {
            // 1. Cek localStorage dulu
            const savedTheme = localStorage.getItem('theme') as Theme | null

            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                theme.value = savedTheme
            } else {
                // 2. Fallback ke system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                theme.value = prefersDark ? 'dark' : 'light'
            }

            // Apply theme ke DOM
            applyTheme(theme.value)
            isInitialized.value = true
        }
    }

    /**
     * Apply theme ke document element
     */
    const applyTheme = (newTheme: Theme) => {
        if (import.meta.client) {
            const html = document.documentElement

            if (newTheme === 'dark') {
                html.classList.add('dark')
            } else {
                html.classList.remove('dark')
            }
        }
    }

    /**
     * Toggle antara light dan dark mode
     */
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    /**
     * Set theme secara eksplisit
     */
    const setTheme = (newTheme: Theme) => {
        theme.value = newTheme
    }

    // Watch theme changes dan save ke localStorage
    watch(theme, (newTheme) => {
        if (import.meta.client) {
            localStorage.setItem('theme', newTheme)
            applyTheme(newTheme)
        }
    })

    // Initialize saat composable pertama kali dipanggil
    onMounted(() => {
        initTheme()
    })

    return {
        theme,
        toggleTheme,
        setTheme,
        initTheme,
        isDark: computed(() => theme.value === 'dark'),
    }
}
