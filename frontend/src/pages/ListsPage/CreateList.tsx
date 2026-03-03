import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
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
  createListSchema,
  type TCreateList,
} from '../../shared/schemes/list.schema.ts'
import { LIST_TYPES } from '../../shared/types/list.type.ts'
import Select from '../../components/ui/Select/Select.tsx'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateList = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.LISTS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateList) => createData(data, API_ENDPOINTS.LISTS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateList>({
    resolver: zodResolver(createListSchema),
    mode: 'onChange',
    defaultValues: {
      animeId: '',
      list: LIST_TYPES[0],
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TCreateList> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.LISTS}`}
      label={`Create ${LOWER_LABELS.LISTS}`}
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
          text={isPending ? 'Creating...' : `Create a ${UPPER_LABELS.LISTS}`}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateList
