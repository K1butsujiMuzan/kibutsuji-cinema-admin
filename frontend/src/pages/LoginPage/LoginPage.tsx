import LoginForm from './LoginForm.tsx'
import LoginHeader from '../../components/layouts/LoginHeader/LoginHeader.tsx'
import { checkToken } from '../../services/token.ts'
import { PAGES } from '../../configs/pages.config.ts'
import { redirect } from 'react-router-dom'
import { getToken } from '../../lib/get-token.ts'

export async function MainLoader() {
  const token = getToken()
  if (token) {
    const isAuthorize = await checkToken(token)
    if (isAuthorize) {
      return redirect(PAGES.DASHBOARD)
    }
  }
  return null
}

const LoginPage = () => {
  return (
    <>
      <LoginHeader />
      <main className={'py-10 md:pb-15 md:pt-35'}>
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
