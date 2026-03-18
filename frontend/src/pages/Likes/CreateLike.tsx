import { QUERY_KEYS } from '../../configs/query-keys.config'
import { useQuerySuccess } from '../../hooks/useQuerySuccess'
import { useMutation } from '@tanstack/react-query'
import {
  createLikeSchema,
  type TCreateLike,
} from '../../shared/schemes/like.schema.ts'
import { createData } from '../../services/create-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LIKE_VALUES } from '../../shared/enums/like-value.type.ts'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateLike = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.LIKES,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateLike) => createData(data, TABLE_KEY.LIKES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateLike>({
    resolver: zodResolver(createLikeSchema),
    mode: 'onChange',
    defaultValues: {
      commentId: '',
      userId: '',
      value: LIKE_VALUES[0],
    },
  })

  const onFormSubmit: SubmitHandler<TCreateLike> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.LIKES}`}
      label={`Create ${LOWER_LABELS.LIKES}`}
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
                hasError={!!errors.commentId?.message}
                labelText={'Comment id'}
                id={'comment-id'}
                autoComplete={'on'}
              />
            )}
            name={'commentId'}
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
              <Select {...field} id={'like-value'} values={LIKE_VALUES} />
            )}
            name={'value'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Creating...' : `Create a ${UPPER_LABELS.LIKES}`}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateLike
