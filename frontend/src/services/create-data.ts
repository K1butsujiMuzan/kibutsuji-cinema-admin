import type { TToast } from '../shared/types/toast.type.ts'
import { ERRORS } from '../constants/errors.ts'
import { SUCCESS } from '../constants/success.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { CRUD_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { UPPER_LABELS } from '../constants/service-message-labels.ts'
import { getToastId } from '../lib/get-toast-id.ts'
import { getToken } from '../lib/get-token.ts'
import type { TCrudEndpointKeys } from '../configs/table-key.config.ts'
import type { TCreateEndpoint } from '../shared/types/crud.type.ts'

export const createData = async <T extends TCrudEndpointKeys>(
  data: TCreateEndpoint[T],
  endpointKey: T,
): Promise<TToast> => {
  const toastID = getToastId()
  const token = getToken()

  try {
    const response = await fetch(CRUD_ENDPOINTS[endpointKey], {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
      title: SUCCESS.CREATE(UPPER_LABELS[endpointKey]),
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
