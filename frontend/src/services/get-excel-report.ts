import {
  EXCEL_REPORT_KEYS,
  type TExcelReport,
} from '../pages/Dashboard/reports/reports.data.ts'
import { EXCEL_API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { getToken } from '../stores/useUserStore.ts'
import type { TExcelForm } from '../shared/schemes/excel-report.schema.ts'
import type { TAnimeReport } from '../shared/types/reports/anime-report.type.ts'
import type { TSubscriptionsReport } from '../shared/types/reports/subscriptions-report.type.ts'
import { ERRORS } from '../constants/errors.ts'
import { reformatDate } from '../lib/date-formater.ts'
import type { TResponseError } from '../shared/types/TResponseError.type.ts'

export type TGetExcel = {
  [EXCEL_REPORT_KEYS.ANIME]: TAnimeReport
  [EXCEL_REPORT_KEYS.SUBSCRIPTIONS]: TSubscriptionsReport
}

export const getExcelReport = async <T extends TExcelReport>(
  type: T,
  formData: TExcelForm,
): Promise<TGetExcel[T] | TResponseError> => {
  const token = getToken()
  const { fromDate, toDate, limit } = formData

  try {
    const url = new URL(EXCEL_API_ENDPOINTS[type])
    url.searchParams.set('from-date', reformatDate(fromDate))
    url.searchParams.set('to-date', reformatDate(toDate))
    url.searchParams.set('limit', String(limit))

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data: TGetExcel[T] | TResponseError = await response.json()

    if ('error' in data) {
      return { error: data.error }
    }

    return data
  } catch (error) {
    console.error(error)
    return { error: ERRORS.SOMETHING_WRONG }
  }
}
