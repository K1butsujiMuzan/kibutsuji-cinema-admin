import { Logo } from '../../components/ui/Logo/Logo.tsx'
import { Link } from 'react-router-dom'
import { PAGE_TITLES, PAGES } from '../../configs/pages.config.ts'
import { useTitle } from '../../hooks/useTitle.ts'

const NotFoundPage = () => {
  useTitle(PAGE_TITLES.NOT_FOUND)

  return (
    <main
      className={
        'text-gray-700 dark:text-gray-100 h-full w-full flex flex-col justify-center items-center gap-3 px-4 text-center overflow-hidden'
      }
    >
      <Logo />
      <h1 className={'text-32 font-semibold'}>Error 404: Page not found :(</h1>
      <Link
        className={
          'text-xl font-semibold bg-pink-50 dark:bg-gray-750 px-5 py-2 rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
        }
        to={PAGES.DASHBOARD}
      >
        To the Main page
      </Link>
    </main>
  )
}

export default NotFoundPage
