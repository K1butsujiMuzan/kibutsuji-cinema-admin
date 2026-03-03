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
  createCommentSchema,
  type TCreateComment,
} from '../../shared/schemes/comment.schema.ts'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateComment = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.COMMENT,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateComment) =>
      createData(data, API_ENDPOINTS.COMMENTS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateComment>({
    resolver: zodResolver(createCommentSchema),
    mode: 'onChange',
    defaultValues: {
      episodeId: '',
      text: '',
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TCreateComment> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.COMMENTS}`}
      label={`Create ${LOWER_LABELS.COMMENTS}`}
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
                hasError={!!errors.episodeId?.message}
                labelText={'Episode id'}
                id={'episode-id'}
                autoComplete={'on'}
              />
            )}
            name={'episodeId'}
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
          text={isPending ? 'Creating...' : `Create a ${UPPER_LABELS.COMMENTS}`}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateComment
