import type { TComment } from '../../shared/types/tables/comments.type.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateComment,
  updateCommentSchema,
} from '../../shared/schemes/comment.schema.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  comment: TComment
}

const UpdateComment = ({ closeModal, comment, clearCheckBoxes }: Props) => {
  const { text, id } = comment

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.COMMENTS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateComment) =>
      updateData(id, data, TABLE_KEY.COMMENTS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateComment>({
    resolver: zodResolver(updateCommentSchema),
    mode: 'onChange',
    defaultValues: {
      text,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateComment> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.COMMENTS}`}
      label={`Update ${LOWER_LABELS.COMMENTS}`}
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
              <LoginTextArea
                {...field}
                hasError={!!errors.text?.message}
                labelText={'Text'}
                id={'text'}
                autoComplete={'off'}
              />
            )}
            name={'text'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Updating...' : `Update a ${UPPER_LABELS.COMMENTS}`}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateComment
