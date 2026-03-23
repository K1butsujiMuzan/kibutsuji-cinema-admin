import { ID_MIN_LENGTH } from '../../constants/limits.ts'
import { z } from 'zod'

export const subscriptionAgreementFormSchema = z.object({
  userId: z.string().trim().min(ID_MIN_LENGTH),
})

export type TSubscriptionAgreementForm = z.infer<
  typeof subscriptionAgreementFormSchema
>
