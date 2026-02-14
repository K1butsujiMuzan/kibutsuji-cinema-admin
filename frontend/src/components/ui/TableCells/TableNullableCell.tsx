interface Props {
  value: string | null | undefined
}

const TableNullableCell = ({ value }: Props) => {
  return (
    <td className={'p-2 max-w-120 text-ellipsis overflow-hidden text-nowrap'}>
      {value || <span className={'opacity-60'}>NULL</span>}
    </td>
  )
}

export default TableNullableCell
