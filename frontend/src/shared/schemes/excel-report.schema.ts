import { z } from 'zod'
import { MAX_LIMIT_REPORT } from '../../constants/limits.ts'

export const excelFormSchema = z.object({
  fromDate: z.string().trim(),
  toDate: z.string().trim(),
  limit: z.number().int().positive().max(MAX_LIMIT_REPORT),
})

export type TExcelForm = z.infer<typeof excelFormSchema>
