import { getUsers } from '../../services/get-users.ts'
import type { IUsers } from '../../shared/types/users.type.ts'
import { userColumns } from './user-page.data.ts'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import { deleteUsers } from '../../services/delete-users.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import UsersTbody from './UsersTbody.tsx'
import AddButton from '../../components/ui/AddButton/AddButton.tsx'
import DeleteButton from '../../components/ui/DeleteButton/DeleteButton.tsx'
import CreateUser from './CreateUser.tsx'
import { getToken } from '../../lib/get-token.ts'

const UsersPage = () => {
  const [users, setUsers] = useState<IUsers[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const addToast = useAddToast()

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getToken()
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

  const onHandleCheck = (id: string) => {
    const isChecked: boolean = checkboxes.includes(id)
    if (isChecked) {
      setCheckboxes((prevState) => prevState.filter((item) => item !== id))
    } else {
      setCheckboxes((prevState) => [...prevState, id])
    }
  }

  const toggleAll = () => {
    if (checkboxes.length === users.length) {
      setCheckboxes([])
    } else {
      const allUsers: string[] = users.map((user) => user.id)
      setCheckboxes([...allUsers])
    }
  }

  const onDelete = async () => {
    const token = getToken()
    const data = await deleteUsers(token, checkboxes)
    addToast(data)
  }

  return (
    <>
      <div className={'flex flex-col p-4'}>
        <div className={'flex gap-2 items-center'}>
          <h1 className={'text-32 font-bold'}>Users</h1>
          <AddButton
            label={'user'}
            onClick={() => setIsCreateModalOpen(true)}
          />
          {checkboxes.length > 0 && (
            <DeleteButton label={'user(s)'} onClick={onDelete} />
          )}
        </div>
        <div className={'overflow-x-auto'}>
          <table
            className={'text-left text-nowrap border w-full border-collapse'}
          >
            <Thead
              columns={userColumns}
              isChecked={users.length > 0 && users.length === checkboxes.length}
              onChange={toggleAll}
            />
            <tbody className={'divide-y text-sm'}>
              {!!users.length &&
                users.map((item, index) => (
                  <UsersTbody
                    user={item}
                    key={item.id}
                    isEven={index % 2 === 0}
                    isChecked={checkboxes.includes(item.id)}
                    onChange={() => onHandleCheck(item.id)}
                  />
                ))}
            </tbody>
          </table>
          {!users.length && <EmptyTable />}
        </div>
      </div>
      {isCreateModalOpen && <CreateUser setIsOpen={setIsCreateModalOpen} />}
    </>
  )
}

export default UsersPage
