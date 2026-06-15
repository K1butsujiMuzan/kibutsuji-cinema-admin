import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { type PointerEvent } from 'react'
import { KEYCODES } from '../../../constants/keycodes.ts'
import CloseModalButton from '../CloseModalButton/CloseModalButton.tsx'
import { cn } from '../../../lib/utils.ts'

interface Props {
  id: string
  children: React.ReactNode
  label: string
  closeModal: () => void
  className?: string
}

const CreateModal = ({ id, children, label, closeModal, className }: Props) => {
  useEffect(() => {
    const root = document.getElementById('root') as HTMLDivElement
    root.setAttribute('inert', 'true')
    document.body.classList.add('modal-hidden')

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === KEYCODES.ESCAPE) {
        closeModal()
      }
    }

    document.addEventListener('keydown', closeOnEsc)

    return () => {
      root.removeAttribute('inert')
      document.removeEventListener('keydown', closeOnEsc)
      document.body.classList.remove('modal-hidden')
    }
  }, [closeModal])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.button === 0) {
      closeModal()
    }
  }

  return createPortal(
    <div
      className={
        'p-4 fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center'
      }
      onPointerDown={handlePointerDown}
    >
      <div
        className={cn(
          'bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-100 w-full max-w-150 rounded-2xl p-4 flex flex-col items-center relative max-h-full overflow-auto transition duration-300',
          className,
        )}
        role={'dialog'}
        aria-modal={true}
        aria-labelledby={id}
      >
        <h2
          className={
            'text-2xl leading-8 md:text-34 md:leading-11 font-medium text-center'
          }
          id={id}
        >
          {label}
        </h2>
        {children}
        <CloseModalButton
          onClose={closeModal}
          className={'absolute top-1 right-1'}
        />
      </div>
    </div>,
    document.body,
  )
}

export default CreateModal
