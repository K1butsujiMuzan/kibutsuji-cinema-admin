import { useSuspenseQuery } from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { getDashboard } from '../../services/get-dashboard.ts'

const DashboardQuantity = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getDashboard(DASHBOARD_QUERY_KEYS.QUANTITY),
    queryKey: [DASHBOARD_QUERY_KEYS.QUANTITY],
  })

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'}>
      {data.map((item) => (
        <div
          className={
            'bg-pink-50 dark:bg-gray-750 rounded-xl p-3 overflow-hidden text-nowrap text-ellipsis text-xl font-semibold transition duration-300'
          }
          key={item.label}
        >
          {item.label}: {item.count}
        </div>
      ))}
    </div>
  )
}

export default DashboardQuantity
