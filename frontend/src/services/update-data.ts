import type { TToast } from '../shared/types/toast.type.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { SUCCESS } from '../constants/success.ts'
import { getToastId } from '../lib/get-toast-id.ts'
import { getToken } from '../lib/get-token.ts'
import { SERVICE_UPPER_LABELS } from '../constants/service-message-labels.ts'
import type { TUpdateEndpoint } from '../configs/api-endpoints.config.ts'

export const updateData = async <T extends keyof TUpdateEndpoint>(
  id: string,
  data: TUpdateEndpoint[T],
  endpoint: T,
): Promise<TToast> => {
  const toastID = getToastId()
  const token = getToken()

  try {
    const response = await fetch(endpoint as string, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...data,
      }),
    })

    const serverData: TToastResponse = await response.json()

    if (!response.ok && !('error' in serverData)) {
      return {
        id: toastID,
        title: ERRORS.SOMETHING_WRONG,
        message: '',
        isSuccess: false,
      }
    }

    if (serverData.error) {
      return {
        id: toastID,
        title: serverData.error,
        message: '',
        isSuccess: false,
      }
    }

    return {
      id: toastID,
      title: SUCCESS.UPDATE(SERVICE_UPPER_LABELS[endpoint]),
      message: '',
      isSuccess: true,
    }
  } catch (error) {
    console.log(error)
    return {
      id: toastID,
      title: ERRORS.SOMETHING_WRONG,
      message: '',
      isSuccess: false,
    }
  }
}
