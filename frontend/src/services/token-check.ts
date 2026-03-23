import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { ERRORS } from '../constants/errors.ts'
import { getToken, setInformation } from '../stores/useUserStore.ts'
import type { IUser } from '../shared/types/user.type.ts'
import type { TResponseError } from '../shared/types/TResponseError.type.ts'

type TTokenCheck = TResponseError | IUser

export const tokenCheck = async (): Promise<boolean> => {
  const token = getToken()

  try {
    const response = await fetch(API_ENDPOINTS.TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      return false
    }

    const data: TTokenCheck = await response.json()

    if ('error' in data) {
      return false
    }

    const { email, role } = data

    setInformation(email, role)

    return true
  } catch (error) {
    console.error(ERRORS.SOMETHING_WRONG, error)
    return false
  }
}
