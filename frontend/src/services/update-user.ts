import type { TUpdateUser } from '../shared/schemes/update-user.schema.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { SUCCESS } from '../constants/success.ts'

export const updateUser = async (
  token: string,
  id: string,
  user: TUpdateUser,
): Promise<TToast> => {
  const randomID = crypto?.randomUUID()
  const date = new Date().toString()

  try {
    const { email, name, role, image, emailVerified, isReceiveNotifications } =
      user

    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        email,
        name,
        role,
        image,
        emailVerified,
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
