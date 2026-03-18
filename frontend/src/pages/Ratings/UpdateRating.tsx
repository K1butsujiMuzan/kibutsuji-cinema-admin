import type { TRating } from '../../shared/types/ratings.type.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateRating,
  updateRatingSchema,
} from '../../shared/schemes/rating.schema.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import { MAX_RATING } from '../../constants/limits.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  animeRating: TRating
}

const UpdateRating = ({ closeModal, animeRating, clearCheckBoxes }: Props) => {
  const { rating, id } = animeRating

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.RATINGS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateRating) =>
      updateData(id, data, TABLE_KEY.RATINGS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateRating>({
    resolver: zodResolver(updateRatingSchema),
    mode: 'onChange',
    defaultValues: {
      rating,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateRating> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.RATINGS}`}
      label={`Update ${LOWER_LABELS.RATINGS}`}
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
          text={isPending ? 'Updating...' : `Update a ${UPPER_LABELS.RATINGS}`}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateRating
