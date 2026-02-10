import ActionButton from '../ActionButton/ActionButton.tsx'

interface Props {
  title: string
  onAdd: () => void
  onDelete: () => void
  isPending: boolean
  isChecked: boolean
  addLabel: string
  deleteLabel: string
}

const ControlBox = ({
  title,
  onAdd,
  onDelete,
  isPending,
  addLabel,
  deleteLabel,
  isChecked,
}: Props) => {
  return (
    <div className={'flex gap-2 items-center'}>
      <h1 className={'text-32 font-bold'}>{title}</h1>
      <ActionButton type={'add'} label={addLabel} onClick={onAdd} />
      {isChecked && (
        <ActionButton
          type={'delete'}
          label={deleteLabel}
          onClick={onDelete}
          disabled={isPending}
        />
      )}
    </div>
  )
}

export default ControlBox
