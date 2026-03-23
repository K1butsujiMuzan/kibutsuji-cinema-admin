import {
  ActionAddIcon,
  ActionArrowLeftIcon,
  ActionArrowRightIcon,
  ActionDeleteIcon,
  ActionFileIcon,
} from './ActionIcons.tsx'
import { memo, useMemo } from 'react'
import { cn } from '../../../lib/utils.ts'

interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
  type: 'add' | 'delete' | 'left' | 'right' | 'file'
  className?: string
}

const ActionButton = ({ label, onClick, disabled, type, className }: Props) => {
  const ariaLabel = useMemo(() => {
    switch (type) {
      case 'add':
        return `create new ${label}`
      case 'delete':
        return `delete selected ${label}`
      case 'file':
        return `export ${label}`
      default:
        return label
    }
  }, [type, label])

  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={ariaLabel}
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
      {type === 'file' && <ActionFileIcon />}
    </button>
  )
}

export default memo(ActionButton)
