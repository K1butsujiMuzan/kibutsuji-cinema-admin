import {
  ActionAddIcon,
  ActionArrowLeftIcon,
  ActionArrowRightIcon,
  ActionDeleteIcon,
} from './ActionIcons.tsx'

interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
  type: 'add' | 'delete' | 'left' | 'right'
}

const ActionButton = ({ label, onClick, disabled, type }: Props) => {
  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={
        type === 'add' ? `create new ${label}` : `delete selected ${label}`
      }
      className={
        'aspect-square p-1 md:p-2 rounded-md disabled:cursor-not-allowed! disabled:opacity-70 hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
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

export default ActionButton
