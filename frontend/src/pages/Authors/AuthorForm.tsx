import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'
import { updateData } from '../../services/update-data.ts'
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
  dataAuthorSchema,
  type TFormAuthor,
} from '../../shared/schemes/author.schema.ts'
import type { TAuthorFormData } from '../../shared/types/tables/authors.type.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  author: TAuthorFormData
  operationType: 'create' | 'update'
}

const AuthorForm = ({
  closeModal,
  author,
  operationType,
  clearCheckBoxes,
}: Props) => {
  const { id, image, originalName, englishName } = author

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.AUTHORS,
    closeModal,
    clearCheckBoxes,
  )

  const createMutation = useMutation({
    mutationFn: (data: TFormAuthor) =>
      createData(
        {
          englishName: data.englishName,
          image: data.image.length > 0 ? data.image : null,
          originalName: data.originalName.length > 0 ? data.originalName : null,
        },
        TABLE_KEY.AUTHORS,
      ),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TFormAuthor) =>
      updateData(
        id,
        {
          englishName: data.englishName,
          image: data.image.length > 0 ? data.image : null,
          originalName: data.originalName.length > 0 ? data.originalName : null,
        },
        TABLE_KEY.AUTHORS,
      ),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TFormAuthor>({
    resolver: zodResolver(dataAuthorSchema),
    mode: 'onChange',
    defaultValues: {
      image: image || '',
      englishName,
      originalName: originalName || '',
    },
  })

  const onFormSubmit: SubmitHandler<TFormAuthor> = async (data) => {
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
          ? `create-${LOWER_LABELS.AUTHORS}`
          : `update-${LOWER_LABELS.AUTHORS}`
      }
      label={
        operationType === 'create'
          ? `Create ${LOWER_LABELS.AUTHORS}`
          : `Update ${LOWER_LABELS.AUTHORS}`
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
                hasError={!!errors.englishName?.message}
                labelText={'English name'}
                id={'english name'}
                autoComplete={'off'}
              />
            )}
            name={'englishName'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.originalName?.message}
                labelText={'Original name'}
                id={'original name'}
                autoComplete={'off'}
              />
            )}
            name={'originalName'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.image?.message}
                labelText={'Image'}
                id={'image'}
                autoComplete={'off'}
              />
            )}
            name={'image'}
          />
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : `Create a ${UPPER_LABELS.AUTHORS}`
              : updateMutation.isPending
                ? 'Updating...'
                : `Update a ${UPPER_LABELS.AUTHORS}`
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

export default AuthorForm
