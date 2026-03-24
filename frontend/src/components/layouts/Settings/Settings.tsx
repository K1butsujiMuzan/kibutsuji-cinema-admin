import ThemeSwitcher from '../../ui/ThemeSwitcher/ThemeSwitcher.tsx'
import LogoutButton from '../../ui/LogoutButton/LogoutButton.tsx'
import MainLink from '../../ui/MainLink/MainLink.tsx'
import { memo, useCallback, useState } from 'react'
import ActionButton from '../../ui/ActionButton/ActionButton.tsx'
import { cn } from '../../../lib/utils.ts'

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSettings = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return (
    <div
      className={cn(
        'overflow-hidden fixed z-30 bottom-0.5 left-0.5 flex items-center gap-1 p-1 text-gray-700 dark:text-gray-100 bg-gray-50/80 dark:bg-gray-950/80 rounded-full border-2 border-pink-50 dark:border-gray-750 ease-in-out transition-[max-width,background-color,color,border-color] duration-[0.7s,0.3s,0.3s,0.3s]',
        {
          'max-w-100': isOpen,
          'max-w-13': !isOpen,
        },
      )}
    >
      <ActionButton
        label={isOpen ? 'close settings menu' : 'open settings menu'}
        className={cn('rounded-full transition-transform duration-700 p-2', {
          'rotate-180': isOpen,
        })}
        onClick={toggleSettings}
        type={'left'}
      />
      <div inert={!isOpen} className={'flex gap-1'}>
        <MainLink />
        <ThemeSwitcher />
        <LogoutButton />
      </div>
    </div>
  )
}

export default memo(Settings)
