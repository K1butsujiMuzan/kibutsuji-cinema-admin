import { cn } from '../../lib/utils.ts'
import EditButton from '../../components/ui/EditButton/EditButton.tsx'
import TableCheckbox from '../../components/ui/TableCheckbox/TableCheckbox.tsx'
import TableBaseCell from '../../components/ui/TableCells/TableBaseCell.tsx'
import type { TEpisode } from '../../shared/types/episodes.type.ts'

interface Props {
  isEven: boolean
  episode: TEpisode
  isChecked: boolean
  onChange: () => void
  onEdit: () => void
}

const EpisodeTBody = ({
  isEven,
  episode,
  isChecked,
  onChange,
  onEdit,
}: Props) => {
  const { id, title, createdAt, episodeNumber, views, updatedAt, animeId } =
    episode

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
          <EditButton label={`episode: ${id}`} onClick={onEdit} />
        </span>
      </td>
      <td>
        <span className={'w-10 h-10 block'}>
          <TableCheckbox
            id={id}
            name={'episode'}
            checked={isChecked}
            onChange={onChange}
          />
        </span>
      </td>
      <TableBaseCell name={id} />
      <TableBaseCell name={animeId} />
      <TableBaseCell name={new Date(createdAt).toLocaleDateString()} />
      <TableBaseCell name={episodeNumber.toString()} />
      <TableBaseCell name={title} />
      <TableBaseCell name={new Date(updatedAt).toLocaleDateString()} />
      <TableBaseCell name={views.toString()} />
    </tr>
  )
}

export default EpisodeTBody
