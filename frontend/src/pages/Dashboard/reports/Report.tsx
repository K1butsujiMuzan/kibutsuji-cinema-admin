import ActionButton from '../../../components/ui/ActionButton/ActionButton.tsx'

interface Props {
  label: string
  onClick: () => void
}

const Report = ({ label, onClick }: Props) => {
  return (
    <div
      className={
        'bg-pink-50 dark:bg-gray-750 rounded-xl px-3 py-1.5 flex items-center gap-2 transition duration-300'
      }
    >
      <span
        className={
          'overflow-hidden text-nowrap text-xl font-semibold text-ellipsis'
        }
      >
        {label}
      </span>
      <ActionButton
        type={'file'}
        label={label.toLowerCase()}
        onClick={onClick}
        className={'p-2'}
      />
    </div>
  )
}

export default Report
