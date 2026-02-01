import { Outlet } from 'react-router-dom'
import Header from '../Header/Header.tsx'
import Sidebar from '../Sidebar/Sidebar.tsx'
import ToastBox from '../../ui/Toast/ToastBox.tsx'

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={'flex flex-1'}>
        <Sidebar />
        <main className={'bg-gray-50 dark:bg-gray-950 overflow-x-hidden'}>
          <Outlet />
        </main>
      </div>
      <ToastBox />
    </>
  )
}

export default MainLayout
