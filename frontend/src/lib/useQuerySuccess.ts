import { useAddToast } from '../stores/useToastsStore.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { useQueryClient } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'
import type { QUERY_KEYS } from '../constants/query-keys.ts'

export const useQuerySuccess = (
  queryKey: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS],
  setIsOpen?: Dispatch<SetStateAction<boolean>>,
  setCheckboxes?: Dispatch<SetStateAction<string[]>>,
) => {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  return async (data: TToast) => {
    addToast(data)
    if (data.isSuccess) {
      await queryClient.invalidateQueries({
        queryKey: [queryKey],
        exact: false,
      })
      if (setCheckboxes) {
        setCheckboxes([])
      } else if (setIsOpen) {
        setIsOpen(false)
      }
    }
  }
}
