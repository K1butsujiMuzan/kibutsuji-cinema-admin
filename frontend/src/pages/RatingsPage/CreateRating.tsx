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
  createRatingSchema,
  type TCreateRating,
} from '../../shared/schemes/rating.schema.ts'
import { MAX_RATING } from '../../constants/limits.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateRating = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.RATINGS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateRating) =>
      createData(data, API_ENDPOINTS.RATINGS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateRating>({
    resolver: zodResolver(createRatingSchema),
    mode: 'onChange',
    defaultValues: {
      animeId: '',
      rating: 0,
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TCreateRating> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.RATINGS}`}
      label={`Create ${LOWER_LABELS.RATINGS}`}
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
              <LoginInput
                {...field}
                type={'number'}
                min={1}
                max={MAX_RATING}
                onChange={(event) => field.onChange(+event.target.value)}
                hasError={!!errors.rating?.message}
                labelText={'Rating'}
                id={'rating'}
              />
            )}
            name={'rating'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Creating...' : `Create a ${UPPER_LABELS.RATINGS}`}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateRating
