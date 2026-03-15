import {
  ActionAddIcon,
  ActionArrowLeftIcon,
  ActionArrowRightIcon,
  ActionDeleteIcon,
} from './ActionIcons.tsx'
import { memo } from 'react'
import { cn } from '../../../lib/utils.ts'

interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
  type: 'add' | 'delete' | 'left' | 'right'
  className?: string
}

const ActionButton = ({ label, onClick, disabled, type, className }: Props) => {
  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={
        type === 'add'
          ? `create new ${label}`
          : type === 'delete'
            ? `delete selected ${label}`
            : `${label}`
      }
      className={cn(
        'aspect-square p-1 md:p-2 rounded-md disabled:cursor-not-allowed! disabled:opacity-70 hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {type === 'add' && <ActionAddIcon />}
      {type === 'delete' && <ActionDeleteIcon />}
      {type === 'left' && <ActionArrowLeftIcon />}
      {type === 'right' && <ActionArrowRightIcon />}
    </button>
  )
}

export default memo(ActionButton)
