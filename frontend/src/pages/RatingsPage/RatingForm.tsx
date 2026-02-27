import type { TRatingFormData } from './ratings-page.data.ts'
import { QUERY_KEYS } from '../../configs/query-keys.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { useMutation } from '@tanstack/react-query'
import {
  dataRatingSchema,
  type TDataRating,
} from '../../shared/schemes/data-rating.schema.ts'
import { createData } from '../../services/create-data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import { MAX_RATING } from '../../constants/max-values.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  animeRating: TRatingFormData
  operationType: 'create' | 'update'
}

const RatingForm = ({
  closeModal,
  animeRating,
  operationType,
  clearCheckBoxes,
}: Props) => {
  const { animeId, rating, userId, id } = animeRating

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.RATINGS,
    closeModal,
    clearCheckBoxes,
  )

  const createMutation = useMutation({
    mutationFn: (data: TDataRating) => createData(data, API_ENDPOINTS.RATINGS),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataRating) =>
      updateData(id, data, API_ENDPOINTS.RATINGS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TDataRating>({
    resolver: zodResolver(dataRatingSchema),
    mode: 'onChange',
    defaultValues: {
      animeId,
      rating,
      userId,
    },
  })

  const onFormSubmit: SubmitHandler<TDataRating> = async (data) => {
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
          ? `create-${LOWER_LABELS.RATINGS}`
          : `update-${LOWER_LABELS.RATINGS}`
      }
      label={
        operationType === 'create'
          ? `Create ${LOWER_LABELS.RATINGS}`
          : `Update ${LOWER_LABELS.RATINGS}`
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
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : `Create a ${UPPER_LABELS.RATINGS}`
              : updateMutation.isPending
                ? 'Updating...'
                : `Update a ${UPPER_LABELS.RATINGS}`
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

export default RatingForm
