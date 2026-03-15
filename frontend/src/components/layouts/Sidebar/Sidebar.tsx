import { sidebar } from './sidebar.data.ts'
import CloseSidebarButton from './CloseSidebarButton.tsx'
import { useCallback, useState } from 'react'
import SidebarLink from './SidebarLink.tsx'
import { cn } from '../../../lib/utils.ts'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onAsideToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return (
    <aside
      className={
        'bg-pink-50 dark:bg-gray-750 p-2 flex flex-col items-start gap-2 transition duration-300'
      }
    >
      <div className={'flex flex-col items-start gap-2'}>
        <div className={'flex justify-between items-center w-full'}>
          <span
            className={cn(
              'font-semibold text-xl overflow-hidden text-nowrap text-ellipsis transition-[max-width] ease-in-out duration-700',
              {
                'max-w-50': isOpen,
                'max-w-0': !isOpen,
              },
            )}
          >
            Tables
          </span>
          <CloseSidebarButton onClose={onAsideToggle} />
        </div>
        <nav>
          <ul className={'flex flex-col gap-2'}>
            {sidebar.map(({ name, href, icon }) => (
              <li key={href}>
                <SidebarLink
                  href={href}
                  Icon={icon}
                  name={name}
                  isOpen={isOpen}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
