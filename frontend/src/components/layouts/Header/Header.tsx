import { Outlet } from 'react-router-dom'
import Logo from '../../ui/Logo/Logo.tsx'
import ThemeSwitcher from '../../ui/ThemeSwitcher/ThemeSwitcher.tsx'

const Header = () => {
  return (
    <>
      <header
        className={
          'bg-pink-50 dark:bg-gray-750 py-2 px-7 flex justify-between items-center'
        }
      >
        <Logo />
        <div>
          <ThemeSwitcher />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Header
