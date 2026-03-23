import type { TLike } from '../../shared/types/tables/likes.type.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateLike,
  updateLikeSchema,
} from '../../shared/schemes/like.schema.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import Select from '../../components/ui/Select/Select.tsx'
import { LIKE_VALUES } from '../../shared/enums/like-value.type.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  like: TLike
}

const UpdateLike = ({ closeModal, like, clearCheckBoxes }: Props) => {
  const { value, id } = like

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.LIKES,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateLike) => updateData(id, data, TABLE_KEY.LIKES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<TUpdateLike>({
    resolver: zodResolver(updateLikeSchema),
    mode: 'onChange',
    defaultValues: {
      value,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateLike> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.LIKES}`}
      label={`Update ${LOWER_LABELS.LIKES}`}
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
              <Select {...field} id={'like-value'} values={LIKE_VALUES} />
            )}
            name={'value'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Updating...' : `Update a ${UPPER_LABELS.LIKES}`}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateLike
