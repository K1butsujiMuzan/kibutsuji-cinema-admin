import TableCheckbox from '../TableCheckbox/TableCheckbox.tsx'

interface Props {
  columns: string[]
  isChecked: boolean
  onChange: () => void
}

const Thead = ({ columns, isChecked, onChange }: Props) => {
  return (
    <thead>
      <tr className={'divide-x border-b transition duration-300'}>
        <th className={'text-center'}>Edit</th>
        <th>
          <span className={'w-10 h-10 block'}>
            <TableCheckbox
              id={'all'}
              name={'all'}
              onChange={onChange}
              checked={isChecked}
            />
          </span>
        </th>
        {columns.map((item) => (
          <th className={'p-2 bg-pink-150 dark:bg-gray-850'} key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead
