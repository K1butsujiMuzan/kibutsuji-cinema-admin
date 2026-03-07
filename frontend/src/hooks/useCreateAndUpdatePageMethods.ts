import { useCallback, useState } from 'react'
import type {
  TCreateUpdateEndpointKeys,
  TCreateUpdateFormData,
} from '../shared/types/crud.type.ts'

export const useCreateAndUpdatePageMethods = <
  T extends TCreateUpdateEndpointKeys,
>() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [information, setInformation] = useState<
    TCreateUpdateFormData[T] | null
  >(null)

  const onHandleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false)
  }, [])

  const onHandleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setIsCreateModalOpen(true)
  }, [])

  const onHandleEdit = (data: TCreateUpdateFormData[T]) => {
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
