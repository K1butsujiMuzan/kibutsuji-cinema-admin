import { cn } from '../../../lib/utils.ts'

interface Props {
  value: boolean
}

const TableBooleanCell = ({ value }: Props) => {
  return (
    <td className={'text-center'}>
      <span
        className={cn('p-1.5 font-semibold rounded-md', {
          'bg-green-400/50': value,
          'bg-red-400/50': !value,
        })}
      >
        {value ? 'true' : 'false'}
      </span>
    </td>
  )
}

export default TableBooleanCell
