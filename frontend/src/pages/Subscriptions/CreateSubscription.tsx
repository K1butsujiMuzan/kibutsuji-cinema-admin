import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'
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
  createSubscriptionSchema,
  type TCreateSubscription,
} from '../../shared/schemes/subscription.schema.ts'
import { SUBSCRIPTION_TYPES } from '../../shared/enums/subscription-type.type.ts'
import Select from '../../components/ui/Select/Select.tsx'
import { currentDate, reformatDate } from '../../lib/date-formater.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateSubscription = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.SUBSCRIPTIONS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateSubscription) =>
      createData(data, TABLE_KEY.SUBSCRIPTIONS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateSubscription>({
    resolver: zodResolver(createSubscriptionSchema),
    mode: 'onChange',
    defaultValues: {
      type: SUBSCRIPTION_TYPES[0],
      endDate: currentDate(),
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TCreateSubscription> = async (data) => {
    const formatedDate = reformatDate(data.endDate)
    mutate({ ...data, endDate: formatedDate })
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.SUBSCRIPTIONS}`}
      label={`Create ${LOWER_LABELS.SUBSCRIPTIONS}`}
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
            isPending ? 'Creating...' : `Create a ${UPPER_LABELS.SUBSCRIPTIONS}`
          }
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateSubscription
