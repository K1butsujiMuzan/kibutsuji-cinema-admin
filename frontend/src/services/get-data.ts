import { CRUD_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { PAGE_LIMIT } from '../constants/limits.ts'
import type { TCrudEndpointKeys } from '../configs/table-key.config.ts'
import type { TGetEndpoint } from '../shared/types/crud.type.ts'
import { getToken } from '../stores/useUserStore.ts'

export async function getData<T extends TCrudEndpointKeys>(
  page: number,
  endpointKey: T,
  search: string,
): Promise<{ data: TGetEndpoint[T]; count: number }> {
  const token = getToken()
  const endpoint = CRUD_ENDPOINTS[endpointKey]

  try {
    const response = await fetch(
      `${endpoint}?page=${page}&limit=${PAGE_LIMIT}${search.length > 0 ? `&search=${search}` : ''}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      return {
        data: [],
        count: 0,
      }
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return {
      data: [],
      count: 0,
    }
  }
}
