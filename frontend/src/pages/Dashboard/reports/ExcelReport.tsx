import CreateModal from '../../../components/ui/CreateModal/CreateModal.tsx'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { currentDate } from '../../../lib/date-formater.ts'
import {
  excelFormSchema,
  type TExcelForm,
} from '../../../shared/schemes/excel-report.schema.ts'
import LoginInput from '../../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../../components/ui/LoginButton/LoginButton.tsx'
import { MAX_LIMIT_REPORT } from '../../../constants/limits.ts'
import { EXCEL_REPORT_LABELS, type TExcelReport } from './reports.data.ts'
import { getExcelReport } from '../../../services/get-excel-report.ts'
import { getToastId } from '../../../lib/get-toast-id.ts'
import { useAddToast } from '../../../stores/useToastsStore.ts'
import { utils, writeFile } from 'xlsx'

interface Props {
  closeModal: () => void
  type: TExcelReport
}

const ExcelReport = ({ type, closeModal }: Props) => {
  const addToast = useAddToast()
  const reportTitle = EXCEL_REPORT_LABELS[type]
    .toLowerCase()
    .split(' ')
    .join('-')

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<TExcelForm>({
    resolver: zodResolver(excelFormSchema),
    mode: 'onChange',
    defaultValues: {
      fromDate: currentDate(),
      toDate: currentDate(),
      limit: 10,
    },
  })

  const onFormSubmit: SubmitHandler<TExcelForm> = async (formData) => {
    const serverData = await getExcelReport(type, formData)
    const toastID = getToastId()

    if ('error' in serverData) {
      return addToast({
        id: toastID,
        title: serverData.error,
        message: '',
        isSuccess: false,
      })
    }

    const { data, ...rest } = serverData

    const worksheet = utils.json_to_sheet(data)

    const keys = Object.keys(rest)
    const values = Object.values(rest)
    utils.sheet_add_aoa(worksheet, [keys, values], { origin: 'D1' })

    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, reportTitle)
    writeFile(
      workbook,
      `${reportTitle}_${formData.fromDate.split('-').reverse().join('.')}-${formData.toDate.split('-').reverse().join('.')}.xlsx`,
    )

    addToast({
      id: toastID,
      title: 'The report was successfully created',
      message: '',
      isSuccess: true,
    })

    closeModal()
  }

  return (
    <CreateModal
      id={`${reportTitle}-report`}
      label={`${EXCEL_REPORT_LABELS[type]} report`}
      closeModal={closeModal}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full flex flex-col gap-5'}
      >
        <div className={'flex flex-col w-full gap-3 items-start'}>
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'date'}
                hasError={!!errors.fromDate?.message}
                labelText={'From date'}
                id={'from-date'}
              />
            )}
            name={'fromDate'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'date'}
                hasError={!!errors.toDate?.message}
                labelText={'To date'}
                id={'to-date'}
              />
            )}
            name={'toDate'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'number'}
                min={1}
                max={MAX_LIMIT_REPORT}
                onChange={(event) => field.onChange(+event.target.value)}
                hasError={!!errors.limit?.message}
                labelText={'Limit'}
                id={'limit'}
              />
            )}
            name={'limit'}
          />
        </div>
        <LoginButton
          text={isSubmitting ? 'Creating...' : `Create report`}
          disabled={isSubmitting || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default ExcelReport
