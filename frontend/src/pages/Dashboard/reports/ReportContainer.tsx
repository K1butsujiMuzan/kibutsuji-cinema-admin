import { useCallback, useState } from 'react'
import Report from './Report.tsx'
import ExcelReport from './ExcelReport.tsx'
import type { TExcelReport, TReport } from './reports.data.ts'
import SubscriptionAgreement from './SubscriptionAgreement.tsx'

const ReportContainer = () => {
  const [modalType, setModalType] = useState<TReport>('none')
  const [excelType, setExcelType] = useState<TExcelReport>('ANIME')

  const closeModal = useCallback(() => {
    setModalType('none')
  }, [])

  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <h2
          className={
            'overflow-hidden text-ellipsis text-nowrap text-2xl font-semibold'
          }
        >
          Reports and documents:
        </h2>
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 flex-1'
          }
        >
          <Report
            onClick={() => {
              setExcelType('ANIME')
              setModalType('excel')
            }}
            label={'Top anime views'}
          />
          <Report
            onClick={() => {
              setExcelType('SUBSCRIPTIONS')
              setModalType('excel')
            }}
            label={'Top subscriptions'}
          />
          <Report
            onClick={() => setModalType('pdf')}
            label={'Subscription agreement'}
          />
        </div>
      </div>
      {modalType === 'excel' && (
        <ExcelReport closeModal={closeModal} type={excelType} />
      )}
      {modalType === 'pdf' && <SubscriptionAgreement closeModal={closeModal} />}
    </>
  )
}

export default ReportContainer
