import { sidebar } from './sidebar.data.ts'
import { NavLink } from 'react-router-dom'
import { cn } from '../../../lib/utils.ts'

const Sidebar = () => {
  return (
    <aside className={'bg-pink-50 dark:bg-gray-750 p-2'}>
      <nav>
        <ul className={'flex flex-col gap-2'}>
          {sidebar.map(({ name, href, icon: Icon }) => (
            <li key={href}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  cn(
                    'flex gap-3 pl-1 pr-5 py-2 font-semibold rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300',
                    { 'bg-pink-75 dark:bg-gray-650': isActive },
                  )
                }
              >
                <Icon />
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
