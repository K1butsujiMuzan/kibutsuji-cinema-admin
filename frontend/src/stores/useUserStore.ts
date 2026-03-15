import { ROLES, type TRole } from '../shared/types/roles.type.ts'
import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type TUserActions = {
  logout: () => void
  setToken: (token: string, email: string, role: TRole) => void
  setInformation: (email: string, role: TRole) => void
}

type TInitialUser = {
  token: string
  email: string
  role: TRole
}

const initialState: TInitialUser = {
  token: '',
  email: '',
  role: ROLES[0],
}

type TUserStore = TInitialUser & TUserActions

const userStore: StateCreator<TUserStore> = (set) => ({
  ...initialState,
  logout: () => {
    set(() => ({ token: '' }))
  },
  setInformation: (email, role) => {
    set(() => ({
      email,
      role,
    }))
  },
  setToken: (token, email, role) => {
    set(() => ({
      token,
      email,
      role,
    }))
  },
})

const useUserStore = create<TUserStore>()(
  persist(userStore, {
    name: 'user',
    partialize: (state) => ({
      token: state.token,
    }),
  }),
)

export const getToken = () => useUserStore.getState().token
export const appLogout = () => useUserStore.getState().logout()
export const setInformation = (email: string, role: TRole) =>
  useUserStore.getState().setInformation(email, role)
export const setToken = (token: string, email: string, role: TRole) =>
  useUserStore.getState().setToken(token, email, role)
export const useEmail = () => useUserStore((state) => state.email)
export const useRole = () => useUserStore((state) => state.role)
