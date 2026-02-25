import { cn } from '../../../lib/utils.ts'
import EditButton from '../EditButton/EditButton.tsx'
import TableCheckbox from '../TableCheckbox/TableCheckbox.tsx'
import TableBaseCell from '../TableCells/TableBaseCell.tsx'
import TableNullableCell from '../TableCells/TableNullableCell.tsx'
import TableBooleanCell from '../TableCells/TableBooleanCell.tsx'
import { dateFormater } from '../../../lib/date-formater.ts'
import { memo } from 'react'

type TbodyRowData =
  | { type: 'text'; value: string | number }
  | { type: 'date'; value: string }
  | { type: 'nullable'; value: string | null }
  | { type: 'boolean'; value: boolean }

interface Props {
  data: TbodyRowData[]
  onEdit: () => void
  isEven: boolean
  isChecked: boolean
  onChange: () => void
  label: string
  id: string
  name: string
}

const Tbody = ({
  data,
  isEven,
  isChecked,
  onChange,
  onEdit,
  label,
  id,
  name,
}: Props) => {
  return (
    <tr
      className={cn(
        'divide-x hover:bg-pink-60 dark:hover:bg-gray-600 transition duration-300',
        {
          'bg-pink-75 dark:bg-gray-750': isEven,
          'bg-pink-100 dark:bg-gray-800': !isEven,
        },
      )}
    >
      <td>
        <span className={'w-10 h-10 block'}>
          <EditButton label={label} onClick={onEdit} />
        </span>
      </td>
      <td>
        <span className={'w-10 h-10 block'}>
          <TableCheckbox
            id={id}
            name={name}
            checked={isChecked}
            onChange={onChange}
          />
        </span>
      </td>
      {data.map((item, index) => {
        switch (item.type) {
          case 'text':
            return <TableBaseCell key={index} name={item.value.toString()} />
          case 'boolean':
            return <TableBooleanCell key={index} value={item.value} />
          case 'date':
            return <TableBaseCell key={index} name={dateFormater(item.value)} />
          case 'nullable':
            return <TableNullableCell key={index} value={item.value} />
          default:
            return null
        }
      })}
    </tr>
  )
}

export default memo(Tbody)
