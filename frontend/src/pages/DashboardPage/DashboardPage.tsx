import { useTitle } from '../../hooks/useTitle.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'

const DashboardPage = () => {
  useTitle(PAGE_TITLES.DASHBOARD)

  return <>Админка</>
}

export default DashboardPage
