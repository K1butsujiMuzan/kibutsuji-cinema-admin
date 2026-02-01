import { useEffect } from 'react'
import { ToastErrorIcon, ToastSuccessIcon } from './ToastIcons.tsx'
import CloseModalButton from '../CloseModalButton/CloseModalButton.tsx'
import type { TToast } from '../../../shared/types/toast.type.ts'
import { useRemoveToast } from '../../../stores/useToastsStore.ts'

const Toast = ({ id, title, message, isSuccess }: TToast) => {
  const closeModal = useRemoveToast()

  useEffect(() => {
    const closeTimeout = setTimeout(() => closeModal(id), 5000)

    return () => clearTimeout(closeTimeout)
  }, [id, closeModal])

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-atomic={true}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className={
        'bg-pink-50 dark:bg-gray-750 p-3 flex items-start gap-3 rounded-xl overflow-hidden relative after:content-[""] after:block after:bg-pink-300 after:h-1 after:w-full after:absolute after:left-0 after:bottom-0 hide-toast-indicator'
      }
    >
      <div className={'flex items-center gap-3'}>
        {isSuccess ? <ToastSuccessIcon /> : <ToastErrorIcon />}
        <div>
          <p className={'font-semibold text-xl leading-6'}>{title}</p>
          <p className={'text-base leading-5'}>{message}</p>
        </div>
      </div>
      <CloseModalButton onClose={() => closeModal(id)} />
    </div>
  )
}

export default Toast
