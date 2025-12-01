import { defineStore } from 'pinia'

interface User {
    name: string
    email?: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null as User | null,
    }),
    actions: {
        login(email: string) {
            // Simulate API call
            this.isAuthenticated = true
            this.user = {
                name: email.split('@')[0] || '', // Use part of email as name for demo
                email,
            }
        },
        logout() {
            this.isAuthenticated = false
            this.user = null
        },
    },
})
