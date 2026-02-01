import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { ERRORS } from '../constants/errors.ts'
import type { IUser } from '../shared/types/user.type.ts'

interface ILoginError {
  error: string
}

interface ILoginSuccess {
  token: string
  user: IUser
}

type TLogin = ILoginError | ILoginSuccess

export async function adminLogin(
  email: string,
  password: string,
): Promise<TLogin> {
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data: TLogin = await response.json()

    if (!response.ok && !('error' in data)) {
      return { error: ERRORS.SOMETHING_WRONG }
    }

    if ('token' in data) {
      return {
        token: data.token,
        user: data.user,
      }
    } else {
      return { error: data.error || ERRORS.SOMETHING_WRONG }
    }
  } catch (error) {
    console.error(error)
    return {
      error: ERRORS.SOMETHING_WRONG,
    }
  }
}
