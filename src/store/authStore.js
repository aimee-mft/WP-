import { create } from 'zustand'

const useAuthStore = create((set) => ({
  // undefined = not yet checked; null = checked, not logged in; object = logged in
  user: undefined,
  loading: true,

  setUser: (user) => set({ user, loading: false }),

  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    set({ user: null, loading: false })
  },
}))

export default useAuthStore
