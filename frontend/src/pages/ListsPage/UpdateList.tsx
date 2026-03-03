import type { TList } from '../../shared/types/lists.type.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateList,
  updateListSchema,
} from '../../shared/schemes/list.schema.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import { LIST_TYPES } from '../../shared/types/list.type.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  animeList: TList
}

const UpdateList = ({ closeModal, animeList, clearCheckBoxes }: Props) => {
  const { list, id } = animeList

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.LISTS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateList) =>
      updateData(id, data, API_ENDPOINTS.LISTS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<TUpdateList>({
    resolver: zodResolver(updateListSchema),
    mode: 'onChange',
    defaultValues: {
      list,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateList> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.LISTS}`}
      label={`Update ${LOWER_LABELS.LISTS}`}
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
              <Select {...field} id={'list'} values={LIST_TYPES} />
            )}
            name={'list'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Updating...' : `Update a ${UPPER_LABELS.LISTS}`}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateList
