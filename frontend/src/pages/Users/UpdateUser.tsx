import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import type { TUser } from '../../shared/types/tables/users.type.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import {
  type TUpdateUser,
  updateUserSchema,
} from '../../shared/schemes/user.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginCheckbox from '../../components/ui/LoginCheckbox/LoginCheckbox.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import { useMutation } from '@tanstack/react-query'
import { updateData } from '../../services/update-data.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { ROLES } from '../../shared/enums/roles.type.ts'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  user: TUser
}

const UpdateUser = ({ closeModal, user, clearCheckBoxes }: Props) => {
  const {
    id,
    email,
    name,
    role,
    emailVerified,
    isReceiveNotifications,
    image,
  } = user

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.USERS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateUser) => updateData(id, data, TABLE_KEY.USERS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues: {
      email,
      name,
      role,
      emailVerified,
      isReceiveNotifications,
      image: image || '',
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateUser> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.USERS}`}
      label={`Update ${LOWER_LABELS.USERS}`}
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
                hasError={!!errors.name?.message}
                labelText={'Name'}
                id={'name'}
                autoComplete={'off'}
              />
            )}
            name={'name'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.email?.message}
                labelText={'Email'}
                id={'email'}
                type={'email'}
                autoComplete={'off'}
              />
            )}
            name={'email'}
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
          <div className={'flex justify-between w-full items-center gap-3'}>
            <div className={'flex flex-col gap-3 items-start'}>
              <Controller
                control={control}
                render={({ field }) => {
                  const { value, ...rest } = field
                  return (
                    <LoginCheckbox
                      {...rest}
                      id={'email-verified'}
                      text={'emailVerified'}
                      inputValue={value}
                    />
                  )
                }}
                name={'emailVerified'}
              />
              <Controller
                control={control}
                render={({ field }) => {
                  const { value, ...rest } = field
                  return (
                    <LoginCheckbox
                      {...rest}
                      id={'is-receive-notifications'}
                      text={'isReceiveNotifications'}
                      inputValue={value}
                    />
                  )
                }}
                name={'isReceiveNotifications'}
              />
            </div>
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'role'} values={ROLES} />
              )}
              name={'role'}
            />
          </div>
        </div>
        <LoginButton
          text={isPending ? 'Updating...' : `Update a ${UPPER_LABELS.USERS}`}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateUser
