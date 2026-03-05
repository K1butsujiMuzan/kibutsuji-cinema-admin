import { useAddToast } from '../stores/useToastsStore.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { useQueryClient } from '@tanstack/react-query'
import type { TQueryKey } from '../configs/query-keys.config.ts'

export const useQuerySuccess = (
  queryKey: TQueryKey,
  closeModal?: () => void,
  clearCheckBoxes?: () => void,
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
      if (clearCheckBoxes) {
        clearCheckBoxes()
      }
      if (closeModal) {
        closeModal()
      }
    }
  }
}
