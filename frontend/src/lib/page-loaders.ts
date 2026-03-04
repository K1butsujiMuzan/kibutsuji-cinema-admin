import { checkToken } from '../services/token.ts'
import { redirect } from 'react-router-dom'
import { PAGES } from '../configs/pages.config.ts'

export async function DashboardLoader() {
  const isAuthorize = await checkToken()
  if (!isAuthorize) {
    return redirect(PAGES.LOGIN)
  }
  return null
}

export async function MainLoader() {
  const isAuthorize = await checkToken()
  if (isAuthorize) {
    return redirect(PAGES.DASHBOARD)
  }
  return null
}
