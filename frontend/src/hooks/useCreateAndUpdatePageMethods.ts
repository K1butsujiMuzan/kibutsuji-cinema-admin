import { useCallback, useState } from 'react'
import type { TCreateUpdateFormData } from '../configs/query-keys.config.ts'

export const useCreateAndUpdatePageMethods = <
  T extends TCreateUpdateFormData[keyof TCreateUpdateFormData],
>() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [information, setInformation] = useState<T | null>(null)

  const onHandleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false)
  }, [])

  const onHandleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setIsCreateModalOpen(true)
  }, [])

  const onHandleEdit = (data: T) => {
    setInformation(data)
    setIsUpdateModalOpen(true)
  }

  return {
    isCreateModalOpen,
    isUpdateModalOpen,
    information,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    onHandleCreate,
    onHandleEdit,
  }
}
