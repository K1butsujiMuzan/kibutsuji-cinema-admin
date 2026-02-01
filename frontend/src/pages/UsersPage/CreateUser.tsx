import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginPassword from '../../components/ui/LoginPassword/LoginPassword.tsx'
import LoginCheckbox from '../../components/ui/LoginCheckbox/LoginCheckbox.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createUserSchema,
  type TCreateUser,
} from '../../shared/schemes/create-user.schema.ts'
import { createUser } from '../../services/create-user.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateUser = ({ setIsOpen }: Props) => {
  const addToast = useAddToast()

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, dirtyFields, isSubmitting },
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
    const token = localStorage.getItem('token') ?? ''
    const response = await createUser(token, data)
    addToast(response)
    if (response.isSuccess) {
      setIsOpen(false)
    }
  }

  return (
    <CreateModal id={'create-user'} label={'Create user'} setIsOpen={setIsOpen}>
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
                isValid={!!errors.name?.message}
                labelText={'name'}
                id={'name'}
              />
            )}
            name={'name'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.email?.message}
                labelText={'email'}
                id={'email'}
                type={'email'}
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
                isValid={!!errors.password?.message}
                labelText={'Password'}
                id={'password'}
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
          text={isSubmitting ? 'Creating...' : 'Create a User'}
          disabled={isSubmitting || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateUser
