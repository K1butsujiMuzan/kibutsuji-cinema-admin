import type { TCreateUser } from '../shared/schemes/create-user.schema.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { ERRORS } from '../constants/errors.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { SUCCESS } from '../constants/success.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'

export const createUser = async (
  token: string,
  user: TCreateUser,
): Promise<TToast> => {
  const randomID = crypto?.randomUUID()
  const date = new Date().toString()

  try {
    const { name, email, password, isReceiveNotifications } = user

    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        isReceiveNotifications,
      }),
    })

    const data: TToastResponse = await response.json()

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
      title: SUCCESS.CREATE('User'),
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
