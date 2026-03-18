import type { TTransaction } from '../../shared/types/transactions.type.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateTransaction,
  updateTransactionSchema,
} from '../../shared/schemes/transaction.schema.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import { MAX_INT } from '../../constants/limits.ts'
import Select from '../../components/ui/Select/Select.tsx'
import { SUBSCRIPTION_TYPES } from '../../shared/enums/subscription-type.type.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  transaction: TTransaction
}

const UpdateTransaction = ({
  closeModal,
  transaction,
  clearCheckBoxes,
}: Props) => {
  const { subscription, sum, id } = transaction

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.TRANSACTIONS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateTransaction) =>
      updateData(id, data, TABLE_KEY.TRANSACTIONS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateTransaction>({
    resolver: zodResolver(updateTransactionSchema),
    mode: 'onChange',
    defaultValues: {
      sum,
      subscription,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateTransaction> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.TRANSACTIONS}`}
      label={`Update ${LOWER_LABELS.TRANSACTIONS}`}
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
            isPending ? 'Updating...' : `Update a ${UPPER_LABELS.TRANSACTIONS}`
          }
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateTransaction
