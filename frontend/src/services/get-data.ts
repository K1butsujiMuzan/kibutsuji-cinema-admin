import { type TGetEndpoint } from '../configs/api-endpoints.config.ts'
import { getToken } from '../lib/get-token.ts'
import { PAGE_LIMIT } from '../constants/max-values.ts'

type TGetData<T> = {
  data: T[]
  count: number
}

export async function getData<T extends keyof TGetEndpoint>(
  page: number,
  endpoint: T,
): Promise<TGetData<TGetEndpoint[T]>> {
  const token = getToken()

  try {
    const response = await fetch(
      `${endpoint}?page=${page}&limit=${PAGE_LIMIT}`,
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
    console.log(error)
    return {
      data: [],
      count: 0,
    }
  }
}
