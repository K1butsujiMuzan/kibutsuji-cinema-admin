import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import type { IUsers } from '../shared/types/users.type.ts'
import { PAGE_LIMIT } from '../constants/page-limit.ts'
import type { TAnime } from '../shared/types/anime.type.ts'

type TEndpointType = {
  [API_ENDPOINTS.USERS]: IUsers
  [API_ENDPOINTS.ANIME]: TAnime
}

type TGetData<T> = {
  data: T[]
  count: number
}

export async function getData<T extends keyof TEndpointType>(
  token: string,
  page: number,
  endpoint: T,
): Promise<TGetData<TEndpointType[T]>> {
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
