import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.tsx'
import Settings from '../Settings/Settings.tsx'

const MainLayout = () => {
  return (
    <>
      <div
        className={
          'grid grid-cols-[auto_1fr] h-screen text-gray-700 dark:text-gray-100'
        }
      >
        <Sidebar />
        <main
          className={
            'bg-gray-50 dark:bg-gray-950 p-4 min-w-0 transition duration-300'
          }
        >
          <Outlet />
        </main>
      </div>
      <Settings />
    </>
  )
}

export default MainLayout
