import { createPortal } from 'react-dom'
import { useToasts } from '../../../stores/useToastsStore.ts'
import Toast from './Toast.tsx'

const ToastBox = () => {
  const box = document.getElementById('toasts-box') as HTMLDivElement
  const toasts = useToasts()

  return createPortal(
    <>
      {toasts.length > 0 &&
        toasts.map((item) => (
          <Toast
            id={item.id}
            title={item.title}
            message={item.message}
            isSuccess={item.isSuccess}
            key={item.id}
          />
        ))}
    </>,
    box,
  )
}

export default ToastBox
