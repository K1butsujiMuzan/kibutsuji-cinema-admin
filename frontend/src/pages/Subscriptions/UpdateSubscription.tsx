import type { TSubscription } from '../../shared/types/tables/subscription.type.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateSubscription,
  updateSubscriptionSchema,
} from '../../shared/schemes/subscription.schema.ts'
import { updateData } from '../../services/update-data.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import { SUBSCRIPTION_TYPES } from '../../shared/enums/subscription-type.type.ts'
import { dateFormater, reformatDate } from '../../lib/date-formater.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  subscription: TSubscription
}

const UpdateSubscription = ({
  closeModal,
  subscription,
  clearCheckBoxes,
}: Props) => {
  const { type, endDate, id } = subscription

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.SUBSCRIPTIONS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateSubscription) =>
      updateData(id, data, TABLE_KEY.SUBSCRIPTIONS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateSubscription>({
    resolver: zodResolver(updateSubscriptionSchema),
    mode: 'onChange',
    defaultValues: {
      type,
      endDate: dateFormater(endDate),
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateSubscription> = (data) => {
    const formatedDate = reformatDate(data.endDate)
    mutate({ ...data, endDate: formatedDate })
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.SUBSCRIPTIONS}`}
      label={`Update ${LOWER_LABELS.SUBSCRIPTIONS}`}
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
                type={'date'}
                hasError={!!errors.endDate?.message}
                labelText={'End date'}
                id={'end-date'}
              />
            )}
            name={'endDate'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Select {...field} id={'type'} values={SUBSCRIPTION_TYPES} />
            )}
            name={'type'}
          />
        </div>
        <LoginButton
          text={
            isPending ? 'Updating...' : `Update a ${UPPER_LABELS.SUBSCRIPTIONS}`
          }
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateSubscription
