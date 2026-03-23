import { useAddToast } from '../../../stores/useToastsStore.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import {
  subscriptionAgreementFormSchema,
  type TSubscriptionAgreementForm,
} from '../../../shared/schemes/subscription-agreement.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../../components/ui/CreateModal/CreateModal.tsx'
import LoginButton from '../../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../../components/ui/LoginInput/LoginInput.tsx'
import { getSubscriptionAgreement } from '../../../services/get-subscription-agreement.ts'
import { getToastId } from '../../../lib/get-toast-id.ts'
import SubscriptionAgreementDocument from './SubscriptionAgreementDocument.tsx'
import { pdf } from '@react-pdf/renderer'
import { ERRORS } from '../../../constants/errors.ts'

interface Props {
  closeModal: () => void
}

const SubscriptionAgreement = ({ closeModal }: Props) => {
  const addToast = useAddToast()

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<TSubscriptionAgreementForm>({
    resolver: zodResolver(subscriptionAgreementFormSchema),
    mode: 'onChange',
    defaultValues: {
      userId: '',
    },
  })

  const onFormSubmit: SubmitHandler<TSubscriptionAgreementForm> = async (
    formData,
  ) => {
    const serverData = await getSubscriptionAgreement(formData)
    const toastID = getToastId()

    if ('error' in serverData) {
      return addToast({
        id: toastID,
        title: serverData.error,
        message: '',
        isSuccess: false,
      })
    }

    const pdfDocument = <SubscriptionAgreementDocument data={serverData} />

    try {
      const blob = await pdf(pdfDocument).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `subscription-agreement_${serverData.email}.pdf`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      addToast({
        id: toastID,
        title: 'The subscription agreement was successfully created',
        message: '',
        isSuccess: true,
      })

      closeModal()
    } catch (error) {
      console.error(error)
      addToast({
        id: toastID,
        title: ERRORS.GENERATE_ERROR,
        message: '',
        isSuccess: false,
      })
    }
  }

  return (
    <CreateModal
      id={`subscription-agreement`}
      label={`Subscription agreement`}
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
                hasError={!!errors.userId?.message}
                labelText={'User id'}
                id={'user-id'}
                autoComplete={'on'}
              />
            )}
            name={'userId'}
          />
        </div>
        <LoginButton
          text={isSubmitting ? 'Creating...' : `Create agreement`}
          disabled={isSubmitting || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default SubscriptionAgreement
