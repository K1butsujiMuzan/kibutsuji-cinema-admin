import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { SUCCESS } from '../constants/success.ts'
import { ERRORS } from '../constants/errors.ts'

type TDelete = {
  error: string | null
}

export const deleteUsers = async (
  token: string,
  id: string[],
): Promise<TToast> => {
  const randomID = crypto?.randomUUID()
  const date = new Date().toString()

  try {
    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    })

    const data: TDelete = await response.json()

    if (!response.ok && !('error' in data)) {
      return {
        id: randomID || date,
        title: ERRORS.SOMETHING_WRONG,
        message: '',
        isSuccess: false,
      }
    }

    if (data.error) {
      return {
        id: randomID || date,
        title: data.error,
        message: '',
        isSuccess: false,
      }
    }

    return {
      id: randomID || date,
      title: SUCCESS.DELETE('User(s)'),
      message: '',
      isSuccess: true,
    }
  } catch (error) {
    console.log(error)
    return {
      id: randomID || date,
      title: ERRORS.SOMETHING_WRONG,
      message: '',
      isSuccess: false,
    }
  }
}
