import { API_ENDPOINTS } from '../configs/api-endpoints.ts'
import { ERRORS } from '../configs/errors.ts'

interface ITokenResponse {
  error: string | null
}

export const checkToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })

    if (!response.ok) {
      return false
    }

    const data: ITokenResponse = await response.json()

    if (data.error) return false

    return true
  } catch (error) {
    console.error(ERRORS.SOMETHING_WRONG, error)
    return false
  }
}
