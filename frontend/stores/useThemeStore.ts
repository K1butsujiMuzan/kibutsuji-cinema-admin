import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type TThemeActions = {
  toggleTheme: () => void
}

type TInitialTheme = {
  isDark: boolean
}

type TTheme = TThemeActions & TInitialTheme

const initialState: TInitialTheme = {
  isDark: true,
}

const themeStore: StateCreator<TTheme> = (set) => ({
  ...initialState,
  toggleTheme: () => {
    set((state) => ({ isDark: !state.isDark }))
  },
})

const useThemeStore = create<TTheme>()(
  persist(themeStore, {
    name: 'theme',
    partialize: (state) => ({ isDark: state.isDark }),
  }),
)

export const useIsDark = () => useThemeStore((state) => state.isDark)
export const toggleTheme = () => useThemeStore.getState().toggleTheme
