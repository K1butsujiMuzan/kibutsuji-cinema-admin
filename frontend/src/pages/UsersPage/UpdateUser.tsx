import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import type { Dispatch, SetStateAction } from 'react'
import type { IUsers } from '../../shared/types/users.type.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import {
  type TUpdateUser,
  updateUserSchema,
} from '../../shared/schemes/update-user.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginCheckbox from '../../components/ui/LoginCheckbox/LoginCheckbox.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import { userRoles } from './user-page.data.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAddToast } from '../../stores/useToastsStore.ts'
import { updateData } from '../../services/update-data.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: IUsers
}

const UpdateUser = ({ setIsOpen, user }: Props) => {
  const {
    id,
    email,
    name,
    role,
    emailVerified,
    isReceiveNotifications,
    image,
  } = user

  const addToast = useAddToast()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateUser) =>
      updateData(id, data, API_ENDPOINTS.USERS),
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
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues: {
      email,
      name,
      role: role,
      emailVerified,
      isReceiveNotifications,
      image: image || '',
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateUser> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal id={'update-user'} label={'Update user'} setIsOpen={setIsOpen}>
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
              <LoginInput
                {...field}
                isValid={!!errors.image?.message}
                labelText={'Image'}
                id={'image'}
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
                <Select {...field} id={'role'} values={userRoles} />
              )}
              name={'role'}
            />
          </div>
        </div>
        <LoginButton
          text={isPending ? 'Updating...' : 'Update a User'}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateUser
