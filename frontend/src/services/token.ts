import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TToastResponse } from '../shared/types/toast-response.type.ts'

export const checkToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    if (!response.ok) {
      return false
    }

    const data: TToastResponse = await response.json()

    if (data.error) return false

    return true
  } catch (error) {
    console.error(ERRORS.SOMETHING_WRONG, error)
    return false
  }
}
