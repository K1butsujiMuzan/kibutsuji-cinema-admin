import { createPortal } from 'react-dom'
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react'
import { type MouseEvent } from 'react'
import { KEYCODES } from '../../../constants/keycodes.ts'
import CloseModalButton from '../CloseModalButton/CloseModalButton.tsx'

interface Props {
  id: string
  children: React.ReactNode
  label: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateModal = ({ id, children, label, setIsOpen }: Props) => {
  const layerRef = useRef<null | HTMLDivElement>(null)

  const closeModal = () => {
    setIsOpen(false)
  }

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
  }, [])

  const closeModalLayer = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  return createPortal(
    <div
      className={
        'fixed inset-0 z-20 backdrop-blur-xs flex items-center justify-center'
      }
      onClick={closeModalLayer}
      ref={layerRef}
    >
      <div
        className={
          'bg-gray-50 dark:bg-gray-950 w-full max-w-150 rounded-2xl p-4 flex flex-col items-center relative max-h-full overflow-auto'
        }
        role={'dialog'}
        aria-modal={true}
        aria-labelledby={id}
      >
        <h2
          className={'text-2xl leading-8 md:text-34 md:leading-11 font-medium'}
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
