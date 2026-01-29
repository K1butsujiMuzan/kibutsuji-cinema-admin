import { API_ENDPOINTS } from '../configs/api-endpoints.ts'
import type { IUsers } from '../shared/types/users.type.ts'

type IGetUsers = {
  users: IUsers[]
}

export const getUsers = async (token: string): Promise<IUsers[] | null> => {
  try {
    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return null
    }

    const data: IGetUsers = await response.json()

    return data.users
  } catch (error) {
    console.log(error)
    return null
  }
}
