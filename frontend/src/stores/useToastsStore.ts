import { create, type StateCreator } from 'zustand'
import type { TToast } from '../shared/types/toast.type.ts'

type TToastsActions = {
  removeToast: (id: string) => void
  addToast: (toast: TToast) => void
}

type TInitialToast = {
  toasts: TToast[]
}

const initialState: TInitialToast = {
  toasts: [],
}

type TToastsStore = TInitialToast & TToastsActions

const toastsStore: StateCreator<TToastsStore> = (set) => ({
  ...initialState,
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
  addToast: (toast) => {
    set((state) => {
      const newToasts = [...state.toasts, toast]
      if (newToasts.length > 5) {
        return { toasts: newToasts.slice(-5) }
      }
      return { toasts: newToasts }
    })
  },
})

const useToastsStore = create<TToastsStore>()(toastsStore)

export const useToasts = () => useToastsStore((state) => state.toasts)
export const useRemoveToast = () => useToastsStore.getState().removeToast
export const useAddToast = () => useToastsStore.getState().addToast
