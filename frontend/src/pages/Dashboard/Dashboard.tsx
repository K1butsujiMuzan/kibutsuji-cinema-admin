import { PAGE_TITLES } from '../../configs/pages.config.ts'
import { Suspense } from 'react'
import Quantity from './Quantity.tsx'
import QuantityLoader from './QuantityLoader.tsx'
import TopAnimeViews from './charts/TopAnimeViews.tsx'
import Loader from '../../components/ui/Loader/Loader.tsx'
import UserWelcome from './UserWelcome.tsx'
import TopAnimeRatings from './charts/TopAnimeRatings.tsx'
import { getPageTitle } from '../../constants/page-information.ts'

const Dashboard = () => {
  return (
    <>
      <title>{getPageTitle(PAGE_TITLES.DASHBOARD)}</title>
      <div className={'flex flex-col gap-4'}>
        <h1 className={'visually-hidden'}>Main</h1>
        <UserWelcome />
        <Suspense fallback={<QuantityLoader />}>
          <Quantity />
        </Suspense>
        <div className={'grid gap-2 grid-cols-1 md:grid-cols-2'}>
          <Suspense
            fallback={
              <div className={'flex justify-center'}>
                <Loader className={'w-40'} />
              </div>
            }
          >
            <TopAnimeViews />
          </Suspense>
          <Suspense
            fallback={
              <div className={'flex justify-center'}>
                <Loader className={'w-40'} />
              </div>
            }
          >
            <TopAnimeRatings />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Dashboard
