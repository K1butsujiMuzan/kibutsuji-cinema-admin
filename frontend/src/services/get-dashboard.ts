import { getToken } from '../stores/useUserStore.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TQuantity } from '../shared/types/quantity.type.ts'
import {
  DASHBOARD_QUERY_KEYS,
  type TDashboardQueryKey,
} from '../configs/query-keys.config.ts'
import { DASHBOARD_API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import type { TAnime } from '../shared/types/anime.type.ts'

type TReturnData = {
  [DASHBOARD_QUERY_KEYS.QUANTITY]: TQuantity[]
  [DASHBOARD_QUERY_KEYS.TOP_ANIME_VIEWS]: TAnime[]
  [DASHBOARD_QUERY_KEYS.TOP_ANIME_RATINGS]: TAnime[]
}

export const getDashboard = async <T extends TDashboardQueryKey>(
  queryKey: T,
): Promise<TReturnData[T]> => {
  const token = getToken()

  const response = await fetch(DASHBOARD_API_ENDPOINTS[queryKey], {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const data: TReturnData[T] | { error: string } = await response.json()

  if (typeof data === 'object' && 'error' in data) {
    throw new Error(data.error)
  }

  if (!response.ok) {
    throw new Error(ERRORS.SOMETHING_WRONG)
  }

  return data
}
