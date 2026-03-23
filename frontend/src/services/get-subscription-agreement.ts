import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { getToken } from '../stores/useUserStore.ts'
import { ERRORS } from '../constants/errors.ts'
import type { TResponseError } from '../shared/types/TResponseError.type.ts'
import type { TSubscriptionAgreement } from '../shared/types/reports/subscription-agreement.type.ts'
import type { TSubscriptionAgreementForm } from '../shared/schemes/subscription-agreement.schema.ts'

export const getSubscriptionAgreement = async (
  formData: TSubscriptionAgreementForm,
): Promise<TSubscriptionAgreement | TResponseError> => {
  const token = getToken()
  const { userId } = formData

  try {
    const url = new URL(API_ENDPOINTS.SUBSCRIPTION_AGREEMENT)
    url.searchParams.set('user-id', userId)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data: TSubscriptionAgreement | TResponseError = await response.json()

    if ('error' in data) {
      return { error: data.error }
    }

    return data
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
