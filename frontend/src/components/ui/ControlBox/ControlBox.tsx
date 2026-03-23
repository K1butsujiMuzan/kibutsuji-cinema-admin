import ActionButton from '../ActionButton/ActionButton.tsx'
import {
  LOWER_LABELS,
  MANY_LOWER_LABELS,
  MANY_UPPER_LABELS,
} from '../../../constants/service-message-labels.ts'
import type { TCrudEndpointKeys } from '../../../configs/table-key.config.ts'

interface Props {
  onAdd: () => void
  onDelete: () => void
  isPending: boolean
  isChecked: boolean
  tableKey: TCrudEndpointKeys
}

const ControlBox = ({
  onAdd,
  onDelete,
  isPending,
  isChecked,
  tableKey,
}: Props) => {
  return (
    <div className={'flex gap-2 items-center flex-wrap overflow-hidden'}>
      <h1
        className={
          'text-32 font-semibold text-nowrap overflow-hidden text-ellipsis'
        }
      >
        {MANY_UPPER_LABELS[tableKey]}
      </h1>
      <ActionButton
        type={'add'}
        label={LOWER_LABELS[tableKey]}
        onClick={onAdd}
      />
      {isChecked && (
        <ActionButton
          type={'delete'}
          label={MANY_LOWER_LABELS[tableKey]}
          onClick={onDelete}
          disabled={isPending}
        />
      )}
    </div>
  )
}

export default ControlBox
