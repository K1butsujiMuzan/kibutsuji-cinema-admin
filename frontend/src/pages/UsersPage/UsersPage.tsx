import { getUsers } from '../../services/get-users.ts'
import type { IUsers } from '../../shared/types/users.type.ts'
import { userColumns } from './user-page.data.ts'
import { cn } from '../../lib/utils.ts'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'

const UsersPage = () => {
  const [users, setUsers] = useState<IUsers[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token') ?? ''
      const data = await getUsers(token)

      if (data) {
        setUsers(data)
      }

      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className={'flex flex-col p-4'}>
      <div className={'overflow-x-auto'}>
        <table className={'text-left text-nowrap border w-full'}>
          <thead>
            <tr className={'divide-x border-b transition duration-300'}>
              {userColumns.map((item) => (
                <th className={'p-2 bg-pink-150 dark:bg-gray-850'} key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={'divide-y text-sm'}>
            {!!users.length &&
              users.map((item, index) => (
                <tr
                  className={cn(
                    'divide-x hover:bg-pink-60 dark:hover:bg-gray-600 transition duration-300',
                    {
                      'bg-pink-75 dark:bg-gray-750': index % 2 === 0,
                      'bg-pink-100 dark:bg-gray-800': index % 2 === 1,
                    },
                  )}
                  key={item.id}
                >
                  <td className={'p-2'}>{item.id}</td>
                  <td className={'p-2'}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className={'p-2'}>{item.email}</td>
                  <td className={'text-center'}>
                    <span
                      className={cn('p-1.5 font-semibold rounded-md', {
                        'bg-green-400/50': item.emailVerified,
                        'bg-red-400/50': !item.emailVerified,
                      })}
                    >
                      {item.emailVerified ? 'true' : 'false'}
                    </span>
                  </td>
                  <td className={'p-2'}>
                    {item.image || <span className={'opacity-60'}>NULL</span>}
                  </td>
                  <td className={'text-center'}>
                    <span
                      className={cn('p-1.5 font-semibold rounded-md', {
                        'bg-green-400/50': item.isReceiveNotifications,
                        'bg-red-400/50': !item.isReceiveNotifications,
                      })}
                    >
                      {item.isReceiveNotifications ? 'true' : 'false'}
                    </span>
                  </td>
                  <td className={'p-2'}>{item.name}</td>
                  <td className={'p-2'}>{item.role}</td>
                  <td className={'p-2'}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!users.length && (
          <div className={'text-center mt-10 text-2xl font-semibold'}>
            Table is empty :(
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage
