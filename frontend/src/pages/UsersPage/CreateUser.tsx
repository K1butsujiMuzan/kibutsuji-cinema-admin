import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginPassword from '../../components/ui/LoginPassword/LoginPassword.tsx'
import LoginCheckbox from '../../components/ui/LoginCheckbox/LoginCheckbox.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createUserSchema,
  type TCreateUser,
} from '../../shared/schemes/create-user.schema.ts'
import { createData } from '../../services/create-data.ts'
import { useMutation } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateUser = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.USERS,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateUser) => createData(data, API_ENDPOINTS.USERS),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, dirtyFields },
  } = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isReceiveNotifications: false,
    },
  })

  const onFormSubmit: SubmitHandler<TCreateUser> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={'create-user'}
      label={'Create user'}
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
              <LoginPassword
                {...field}
                maxLength={50}
                isDirty={!!dirtyFields.password}
                hasError={!!errors.password?.message}
                labelText={'Password'}
                id={'password'}
                autoComplete={'off'}
              />
            )}
            name={'password'}
          />
          <Controller
            control={control}
            render={({ field }) => {
              const { value, ...rest } = field

              return (
                <LoginCheckbox
                  {...rest}
                  text={'isReceiveNotifications'}
                  id={'is-receive-notifications'}
                  inputValue={value}
                />
              )
            }}
            name={'isReceiveNotifications'}
          />
        </div>
        <LoginButton
          text={isPending ? 'Creating...' : 'Create a User'}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateUser
