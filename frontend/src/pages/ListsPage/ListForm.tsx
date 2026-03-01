import type { TListFormData } from './lists-page.data.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  dataListSchema,
  type TDataList,
} from '../../shared/schemes/data-list.schema.ts'
import Select from '../../components/ui/Select/Select.tsx'
import { LIST_TYPES } from '../../shared/types/list.type.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  animeList: TListFormData
  operationType: 'create' | 'update'
}

const ListForm = ({
  closeModal,
  animeList,
  operationType,
  clearCheckBoxes,
}: Props) => {
  const { animeId, list, userId, id } = animeList

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.LISTS,
    closeModal,
    clearCheckBoxes,
  )

  const createMutation = useMutation({
    mutationFn: (data: TDataList) => createData(data, API_ENDPOINTS.LISTS),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataList) => updateData(id, data, API_ENDPOINTS.LISTS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TDataList>({
    resolver: zodResolver(dataListSchema),
    mode: 'onChange',
    defaultValues: {
      animeId,
      list,
      userId,
    },
  })

  const onFormSubmit: SubmitHandler<TDataList> = async (data) => {
    if (operationType === 'create') {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate(data)
    }
  }

  return (
    <CreateModal
      id={
        operationType === 'create'
          ? `create-${LOWER_LABELS.LISTS}`
          : `update-${LOWER_LABELS.LISTS}`
      }
      label={
        operationType === 'create'
          ? `Create ${LOWER_LABELS.LISTS}`
          : `Update ${LOWER_LABELS.LISTS}`
      }
      closeModal={closeModal}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full flex flex-col gap-5'}
      >
        <div className={'flex flex-col w-full gap-3 items-start'}>
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.animeId?.message}
                labelText={'Anime id'}
                id={'anime-id'}
                autoComplete={'on'}
              />
            )}
            name={'animeId'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.userId?.message}
                labelText={'User id'}
                id={'user-id'}
                autoComplete={'on'}
              />
            )}
            name={'userId'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Select {...field} id={'list'} values={LIST_TYPES} />
            )}
            name={'list'}
          />
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : `Create a ${UPPER_LABELS.LISTS}`
              : updateMutation.isPending
                ? 'Updating...'
                : `Update a ${UPPER_LABELS.LISTS}`
          }
          disabled={
            createMutation.isPending ||
            updateMutation.isPending ||
            !isValid ||
            (!isDirty && operationType === 'update')
          }
        />
      </form>
    </CreateModal>
  )
}

export default ListForm
