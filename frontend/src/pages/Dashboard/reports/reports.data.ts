import { StyleSheet } from '@react-pdf/renderer'

export const EXCEL_REPORT_KEYS = {
  ANIME: 'ANIME',
  SUBSCRIPTIONS: 'SUBSCRIPTIONS',
} as const

export const EXCEL_REPORT_LABELS = {
  [EXCEL_REPORT_KEYS.ANIME]: 'Top anime views',
  [EXCEL_REPORT_KEYS.SUBSCRIPTIONS]: 'Top subscriptions',
} as const

export type TReport = 'excel' | 'pdf' | 'none'
export type TExcelReport = keyof typeof EXCEL_REPORT_KEYS

export const subscriptionAgreementStyles = StyleSheet.create({
  page: {
    padding: '32px',
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#000',
  },
  section: {
    paddingBottom: '8px',
    flexDirection: 'column',
    display: 'flex',
    gap: '8px',
    borderBottom: '1px solid #cecece',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'black',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    border: '1px solid #000',
  },
  thead: {
    backgroundColor: '#989898',
  },
  text: {
    fontSize: '14px',
  },
  ul: {
    fontSize: '14px',
    paddingLeft: '16px',
  },
  footer: {
    fontSize: '12px',
  },
})
