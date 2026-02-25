import type { TGenreFormData } from './genres-page.data.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  dataGenreSchema,
  type TDataGenre,
} from '../../shared/schemes/data-genre.schema.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  genre: TGenreFormData
  operationType: 'create' | 'update'
}

const GenreForm = ({
  closeModal,
  genre,
  operationType,
  clearCheckBoxes,
}: Props) => {
  const { name, id } = genre

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.GENRES,
    closeModal,
    clearCheckBoxes,
  )

  const createMutation = useMutation({
    mutationFn: (data: TDataGenre) => createData(data, API_ENDPOINTS.GENRES),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataGenre) =>
      updateData(id, data, API_ENDPOINTS.GENRES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TDataGenre>({
    resolver: zodResolver(dataGenreSchema),
    mode: 'onChange',
    defaultValues: {
      name,
    },
  })

  const onFormSubmit: SubmitHandler<TDataGenre> = async (data) => {
    if (operationType === 'create') {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate(data)
    }
  }

  return (
    <CreateModal
      id={operationType === 'create' ? 'create-genre' : 'update-genre'}
      label={operationType === 'create' ? 'Create genre' : 'Update genre'}
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
                hasError={!!errors.name?.message}
                labelText={'Name'}
                id={'name'}
                autoComplete={'off'}
              />
            )}
            name={'name'}
          />
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : 'Create a Genre'
              : updateMutation.isPending
                ? 'Updating...'
                : 'Update a Genre'
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

export default GenreForm
