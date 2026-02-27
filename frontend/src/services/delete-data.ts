import type { TToast } from '../shared/types/toast.type.ts'
import { SUCCESS } from '../constants/success.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { getToken } from '../lib/get-token.ts'
import { SERVICE_MANY_UPPER_LABELS } from '../constants/service-message-labels.ts'

export const deleteData = async (
  id: string[],
  endpoint: (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS],
): Promise<TToast> => {
  const randomID = crypto?.randomUUID()
  const date = new Date().toString()
  const token = getToken()

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
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
      title: SUCCESS.DELETE(SERVICE_MANY_UPPER_LABELS[endpoint]),
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
