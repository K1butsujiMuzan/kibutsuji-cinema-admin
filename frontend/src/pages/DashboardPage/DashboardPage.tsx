import { checkToken } from '../../services/token.ts'
import { redirect } from 'react-router-dom'
import { PAGES } from '../../configs/pages.config.ts'

export async function DashboardLoader() {
  const token = localStorage.getItem('token') || ''
  if (token) {
    const isAuthorize = await checkToken(token)
    if (!isAuthorize) {
      return redirect(PAGES.MAIN)
    } else {
      return null
    }
  }
  return redirect(PAGES.MAIN)
}

const DashboardPage = () => {
  return <>Админка</>
}

export default DashboardPage
