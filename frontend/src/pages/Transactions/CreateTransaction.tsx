import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SUBSCRIPTION_TYPES } from '../../shared/enums/subscription-type.type.ts'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  createTransactionSchema,
  type TCreateTransaction,
} from '../../shared/schemes/transaction.schema.ts'
import { MAX_INT } from '../../constants/limits.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateTransaction = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.TRANSACTIONS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateTransaction) =>
      createData(data, TABLE_KEY.TRANSACTIONS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    mode: 'onChange',
    defaultValues: {
      sum: 0,
      subscription: SUBSCRIPTION_TYPES[0],
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TCreateTransaction> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.TRANSACTIONS}`}
      label={`Create ${LOWER_LABELS.TRANSACTIONS}`}
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
                min={0}
                max={MAX_INT}
                step={'any'}
                onChange={(event) => field.onChange(+event.target.value)}
                hasError={!!errors.sum?.message}
                labelText={'Sum'}
                id={'sum'}
              />
            )}
            name={'sum'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id={'subscription'}
                values={SUBSCRIPTION_TYPES}
              />
            )}
            name={'subscription'}
          />
        </div>
        <LoginButton
          text={
            isPending ? 'Creating...' : `Create a ${UPPER_LABELS.TRANSACTIONS}`
          }
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateTransaction
