import type { TCreateUser } from '../shared/schemes/create-user.schema.ts'
import type { TToast } from '../shared/types/toast.type.ts'
import { ERRORS } from '../constants/errors.ts'
import { SUCCESS } from '../constants/success.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { SERVICE_UPPER_LABELS } from '../constants/service-message-labels.ts'
import type { TDataSubmitAnime } from '../shared/schemes/data-anime.schema.ts'
import { getToastId } from '../lib/get-toast-id.ts'
import { getToken } from '../lib/get-token.ts'
import type { TDataEpisode } from '../shared/schemes/data-episode.schema.ts'
import type { TDataGenre } from '../shared/schemes/data-genre.schema.ts'
import type { TDataRating } from '../shared/schemes/data-rating.schema.ts'

type TEndpointType = {
  [API_ENDPOINTS.USERS]: TCreateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.EPISODES]: TDataEpisode
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TDataRating
}

export const createData = async <T extends keyof TEndpointType>(
  data: TEndpointType[T],
  endpoint: T,
): Promise<TToast> => {
  const toastID = getToastId()
  const token = getToken()

  try {
    const response = await fetch(endpoint as string, {
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
      title: SUCCESS.CREATE(SERVICE_UPPER_LABELS[endpoint]),
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
