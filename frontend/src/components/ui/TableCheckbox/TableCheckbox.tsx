import { cn } from '../../../lib/utils.ts'
import { useRef } from 'react'
import { KEYCODES } from '../../../constants/keycodes.ts'
import { type KeyboardEvent } from 'react'

interface Props {
  className?: string
  id: string
  name: string
  checked: boolean
  onChange: () => void
}

const TableCheckbox = ({ className, id, name, checked, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onLabelKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === KEYCODES.ENTER || event.key === KEYCODES.SPACE) {
      event.preventDefault()
      onChange()
    }
  }

  return (
    <label
      onKeyDown={onLabelKeyDown}
      role={'checkbox'}
      aria-checked={checked}
      className={cn('relative flex items-center justify-center', className, {
        'bg-gray-50 dark:bg-gray-950': !checked,
        'bg-pink-300': checked,
      })}
      tabIndex={0}
      htmlFor={id}
    >
      <input
        ref={inputRef}
        onChange={onChange}
        tabIndex={-1}
        id={id}
        name={name}
        type={'checkbox'}
        checked={checked}
        className={'absolute inset-0 opacity-0 cursor-pointer peer'}
      />
      <span
        aria-hidden={true}
        className={
          'w-4 aspect-square border rounded-sm block peer-checked:hidden'
        }
      ></span>
      <svg
        role={'img'}
        aria-hidden={true}
        className={'hidden peer-checked:block'}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5951 3.36763C15.0152 2.72683 14.0253 2.6779 13.3845 3.25788L6.47446 9.51411L2.64233 5.87584C2.01528 5.28078 1.02458 5.3067 0.429796 5.93349C-0.164991 6.56028 -0.139338 7.55071 0.48745 8.14576L5.30287 12.7165C5.60568 13.0043 5.99286 13.1468 6.37978 13.1468C6.59717 13.1468 6.8143 13.1003 7.01609 13.0104C7.25014 12.949 7.47335 12.8321 7.66535 12.6581L15.4851 5.57805C16.1262 4.99807 16.1751 4.00843 15.5951 3.36763Z"
          fill="white"
        />
      </svg>
    </label>
  )
}

export default TableCheckbox
