import type { TUpdateUser } from '../shared/schemes/update-user.schema.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { SUCCESS } from '../constants/success.ts'
import type { TDataSubmitAnime } from '../shared/schemes/data-anime.schema.ts'
import { getToastId } from '../lib/get-toast-id.ts'
import { getToken } from '../lib/get-token.ts'
import { SERVICE_MESSAGE_LABELS } from '../constants/service-message-labels.ts'
import type { TDataEpisode } from '../shared/schemes/data-episode.schema.ts'
import type { TDataGenre } from '../shared/schemes/data-genre.schema.ts'

type TEndpointType = {
  [API_ENDPOINTS.USERS]: TUpdateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.EPISODES]: TDataEpisode
  [API_ENDPOINTS.GENRES]: TDataGenre
}

export const updateData = async <T extends keyof TEndpointType>(
  id: string,
  data: TEndpointType[T],
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
      title: SUCCESS.UPDATE(SERVICE_MESSAGE_LABELS[endpoint]),
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
