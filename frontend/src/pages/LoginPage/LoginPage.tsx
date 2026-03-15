import LoginForm from './LoginForm.tsx'
import LoginHeader from '../../components/layouts/LoginHeader/LoginHeader.tsx'
import { useTitle } from '../../hooks/useTitle.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'

const LoginPage = () => {
  useTitle(PAGE_TITLES.LOGIN)

  return (
    <>
      <LoginHeader />
      <main
        className={'py-10 md:pb-15 md:pt-35 text-gray-700 dark:text-gray-100'}
      >
        <div className={'px-10 w-full flex flex-col items-center gap-4'}>
          <h1
            className={
              'text-2xl leading-8 md:text-34 md:leading-11 font-medium'
            }
          >
            Login
          </h1>
          <LoginForm />
        </div>
      </main>
    </>
  )
}

export default LoginPage
