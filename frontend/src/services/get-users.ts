import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import type { IUsers } from '../shared/types/users.type.ts'
import { PAGE_LIMIT } from '../constants/page-limit.ts'

type IGetUsers = {
  users: IUsers[]
  count: number
}

export const getUsers = async (token: string, page = 1): Promise<IGetUsers> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.USERS}?page=${page}&limit=${PAGE_LIMIT}`,
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
        users: [],
        count: 0,
      }
    }

    return await response.json()
  } catch (error) {
    console.log(error)
    return {
      users: [],
      count: 0,
    }
  }
}
