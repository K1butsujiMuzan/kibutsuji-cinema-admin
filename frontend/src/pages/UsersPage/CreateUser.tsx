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
import { createData } from '../../services/create-data.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateUser = ({ setIsOpen }: Props) => {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateUser) => createData(data, API_ENDPOINTS.USERS),
    onSuccess: async (data) => {
      addToast(data)
      if (data.isSuccess) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USERS],
          exact: false,
        })
        setIsOpen(false)
      }
    },
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
                labelText={'Name'}
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
                labelText={'Email'}
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
          text={isPending ? 'Creating...' : 'Create a User'}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateUser
