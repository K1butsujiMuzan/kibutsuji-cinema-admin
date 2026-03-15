import type { TToast } from '../shared/types/toast.type.ts'
import { SUCCESS } from '../constants/success.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { SERVICE_MANY_UPPER_LABELS } from '../constants/service-message-labels.ts'
import { getToastId } from '../lib/get-toast-id.ts'
import type { TCrudEndpointKeys } from '../configs/table-key.config.ts'
import { CRUD_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { getToken } from '../stores/useUserStore.ts'

export const deleteData = async (
  id: string[],
  tableKey: TCrudEndpointKeys,
): Promise<TToast> => {
  const toastID = getToastId()
  const token = getToken()

  try {
    const response = await fetch(CRUD_ENDPOINTS[tableKey], {
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
        id: toastID,
        title: ERRORS.SOMETHING_WRONG,
        message: '',
        isSuccess: false,
      }
    }

    if (data.error) {
      return {
        id: toastID,
        title: data.error,
        message: '',
        isSuccess: false,
      }
    }

    return {
      id: toastID,
      title: SUCCESS.DELETE(SERVICE_MANY_UPPER_LABELS[tableKey]),
      message: '',
      isSuccess: true,
    }
  } catch (error) {
    console.error(error)
    return {
      id: toastID,
      title: ERRORS.SOMETHING_WRONG,
      message: '',
      isSuccess: false,
    }
  }
}
