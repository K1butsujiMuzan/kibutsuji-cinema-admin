import Logo from '../../ui/Logo/Logo.tsx'
import ThemeSwitcher from '../../ui/ThemeSwitcher/ThemeSwitcher.tsx'
import LogoutButton from '../../ui/LogoutButton/LogoutButton.tsx'

const Header = () => {
  return (
    <header
      className={
        'bg-pink-50 dark:bg-gray-750 py-2 px-3 flex justify-between items-center'
      }
    >
      <Logo />
      <div className={'flex gap-3'}>
        <ThemeSwitcher />
        <LogoutButton />
      </div>
    </header>
  )
}

export default Header
