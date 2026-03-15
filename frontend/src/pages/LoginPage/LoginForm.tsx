import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginPassword from '../../components/ui/LoginPassword/LoginPassword.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema, type TLogin } from '../../shared/schemes/login.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminLogin } from '../../services/login.ts'
import { PAGES } from '../../configs/pages.config.ts'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../stores/useUserStore.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import { getToastId } from '../../lib/get-toast-id.ts'

const LoginForm = () => {
  const addToast = useAddToast()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields, isSubmitting, errors },
  } = useForm<TLogin>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onFormSubmit: SubmitHandler<TLogin> = async (data) => {
    const response = await adminLogin(data.email, data.password)
    if ('error' in response) {
      addToast({
        id: getToastId(),
        title: response.error,
        message: '',
        isSuccess: false,
      })
    } else {
      addToast({
        id: getToastId(),
        title: 'Successful login',
        message: '',
        isSuccess: true,
      })
      setToken(response.token, response.user.email, response.user.role)
      navigate(PAGES.DASHBOARD, { replace: true })
    }
  }

  return (
    <form
      className={'max-w-104 w-full flex flex-col gap-5'}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className={'flex flex-col gap-4 py-5 md:py-10'}>
        <Controller
          name={'email'}
          control={control}
          render={({ field }) => (
            <LoginInput
              {...field}
              hasError={!!errors.email?.message}
              labelText={'Email'}
              id={'email'}
              type={'email'}
              autoComplete={'email'}
            />
          )}
        />
        <Controller
          name={'password'}
          control={control}
          render={({ field }) => (
            <LoginPassword
              {...field}
              hasError={!!errors.password?.message}
              isDirty={!!dirtyFields.password}
              labelText={'Password'}
              id={'password'}
              maxLength={50}
              autoComplete={'current-password'}
            />
          )}
        />
      </div>
      <LoginButton
        disabled={isSubmitting || !isValid}
        text={isSubmitting ? 'Logging in...' : 'Login'}
      />
    </form>
  )
}

export default LoginForm
