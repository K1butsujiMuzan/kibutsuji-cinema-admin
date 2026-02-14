interface Props {
  name: string
}

const TableBaseCell = ({ name }: Props) => {
  return (
    <td className={'p-2 max-w-120 text-ellipsis overflow-hidden text-nowrap'}>
      {name}
    </td>
  )
}

export default TableBaseCell
