import Logo from '../ui/Logo/Logo.tsx'

const LoginHeader = () => {
  return (
    <header
      className={'bg-pink-50/60 dark:bg-gray-750/60 w-full px-3 py-2 shadow-sm'}
    >
      <div className={'flex justify-center'}>
        <Logo />
      </div>
    </header>
  )
}

export default LoginHeader
