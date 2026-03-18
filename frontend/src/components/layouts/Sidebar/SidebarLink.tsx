import { NavLink } from 'react-router-dom'
import { cn } from '../../../lib/utils.ts'
import type { FC, SVGProps } from 'react'
import { memo } from 'react'

interface Props {
  href: string
  name: string
  Icon: FC<SVGProps<SVGSVGElement>>
  isOpen: boolean
}

const SidebarLink = ({ href, name, Icon, isOpen }: Props) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          'flex items-center p-2.75 font-semibold rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition-[background-color,scale] duration-300',
          {
            'bg-pink-75 dark:bg-gray-650': isActive,
          },
        )
      }
    >
      <Icon />
      <span
        className={cn(
          'overflow-hidden leading-4.5 w-auto origin-left text-nowrap text-ellipsis transition-[max-width,margin-left] ease-in-out duration-700',
          {
            'max-w-50 ml-3': isOpen,
            'max-w-0': !isOpen,
          },
        )}
      >
        {name}
      </span>
    </NavLink>
  )
}

export default memo(SidebarLink)
