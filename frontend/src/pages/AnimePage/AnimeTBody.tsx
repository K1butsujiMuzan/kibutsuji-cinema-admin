import type { TAnime } from '../../shared/types/anime.type.ts'
import { cn } from '../../lib/utils.ts'
import EditButton from '../../components/ui/EditButton/EditButton.tsx'
import TableCheckbox from '../../components/ui/TableCheckbox/TableCheckbox.tsx'
import TableBaseCell from '../../components/ui/TableCells/TableBaseCell.tsx'
import TableNullableCell from '../../components/ui/TableCells/TableNullableCell.tsx'

interface Props {
  isEven: boolean
  anime: TAnime
  isChecked: boolean
  onChange: () => void
  onEdit: () => void
}

const AnimeTBody = ({ isEven, anime, isChecked, onChange, onEdit }: Props) => {
  const {
    id,
    title,
    createdAt,
    image,
    type,
    updatedAt,
    originalTitle,
    ageLimit,
    episodesLength,
    episodesCount,
    episodesReleased,
    releaseDate,
    slug,
    genres,
    status,
    views,
    description,
  } = anime

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
          <EditButton label={`anime: ${slug}`} onClick={onEdit} />
        </span>
      </td>
      <td>
        <span className={'w-10 h-10 block'}>
          <TableCheckbox
            id={id}
            name={'user'}
            checked={isChecked}
            onChange={onChange}
          />
        </span>
      </td>
      <TableBaseCell name={id} />
      <TableBaseCell name={ageLimit} />
      <TableBaseCell name={new Date(createdAt).toLocaleDateString()} />
      <TableNullableCell value={description} />
      <TableBaseCell name={episodesCount.toString()} />
      <TableBaseCell name={episodesLength.toString()} />
      <TableBaseCell name={episodesReleased.toString()} />
      <TableNullableCell value={image} />
      <TableBaseCell name={originalTitle} />
      <TableBaseCell name={new Date(releaseDate).toLocaleDateString()} />
      <TableBaseCell name={slug} />
      <TableBaseCell name={status} />
      <TableBaseCell name={title} />
      <TableBaseCell name={type} />
      <TableBaseCell name={new Date(updatedAt).toLocaleDateString()} />
      <TableBaseCell name={views.toString()} />
      <TableBaseCell name={genres.map((item) => item.id).join(' ')} />
    </tr>
  )
}

export default AnimeTBody
