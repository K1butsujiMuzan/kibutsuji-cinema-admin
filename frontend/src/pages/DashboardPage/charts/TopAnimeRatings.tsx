import { useSuspenseQuery } from '@tanstack/react-query'
import { getDashboard } from '../../../services/get-dashboard.ts'
import { DASHBOARD_QUERY_KEYS } from '../../../configs/query-keys.config.ts'
import { Bar } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { BAR_DATASETS, CHART_OPTIONS } from './charts.data.ts'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const TopAnimeRatings = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getDashboard(DASHBOARD_QUERY_KEYS.TOP_ANIME_RATINGS),
    queryKey: [DASHBOARD_QUERY_KEYS.TOP_ANIME_RATINGS],
  })

  return (
    <div>
      <h2
        className={
          'mb-2 overflow-hidden text-ellipsis text-nowrap text-2xl font-semibold'
        }
      >
        Top anime ratings
      </h2>
      <Bar
        data={BAR_DATASETS(
          data.map((item) => item.title),
          data.map((item) => item.rating),
          'Rating',
        )}
        options={CHART_OPTIONS}
      />
    </div>
  )
}

export default TopAnimeRatings
