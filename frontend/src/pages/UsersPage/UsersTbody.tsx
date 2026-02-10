import { cn } from '../../lib/utils.ts'
import TableCheckbox from '../../components/ui/TableCheckbox/TableCheckbox.tsx'
import type { IUsers } from '../../shared/types/users.type.ts'
import EditButton from '../../components/ui/EditButton/EditButton.tsx'

interface Props {
  isEven: boolean
  user: IUsers
  isChecked: boolean
  onChange: () => void
  onEdit: () => void
}

const UsersTbody = ({ isEven, user, onChange, isChecked, onEdit }: Props) => {
  const {
    id,
    name,
    isReceiveNotifications,
    emailVerified,
    email,
    image,
    createdAt,
    role,
    updatedAt,
  } = user

  return (
    <tr
      className={cn(
        'divide-x hover:bg-pink-60 dark:hover:bg-gray-600 transition duration-300',
        {
          'bg-pink-75 dark:bg-gray-750': isEven,
          'bg-pink-100 dark:bg-gray-800': !isEven,
        },
      )}
      key={id}
    >
      <td>
        <span className={'w-10 h-10 block'}>
          <EditButton label={`user: ${email}`} onClick={onEdit} />
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
      <td className={'p-2'}>{id}</td>
      <td className={'p-2'}>{new Date(createdAt).toLocaleDateString()}</td>
      <td className={'p-2'}>{email}</td>
      <td className={'text-center'}>
        <span
          className={cn('p-1.5 font-semibold rounded-md', {
            'bg-green-400/50': emailVerified,
            'bg-red-400/50': !emailVerified,
          })}
        >
          {emailVerified ? 'true' : 'false'}
        </span>
      </td>
      <td className={'p-2'}>
        {image || <span className={'opacity-60'}>NULL</span>}
      </td>
      <td className={'text-center'}>
        <span
          className={cn('p-1.5 font-semibold rounded-md', {
            'bg-green-400/50': isReceiveNotifications,
            'bg-red-400/50': !isReceiveNotifications,
          })}
        >
          {isReceiveNotifications ? 'true' : 'false'}
        </span>
      </td>
      <td className={'p-2'}>{name}</td>
      <td className={'p-2'}>{role}</td>
      <td className={'p-2'}>{new Date(updatedAt).toLocaleDateString()}</td>
    </tr>
  )
}

export default UsersTbody
