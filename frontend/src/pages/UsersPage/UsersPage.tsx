import { getUsers } from '../../services/get-users.ts'
import { userColumns } from './user-page.data.ts'
import { useState } from 'react'
import { deleteUsers } from '../../services/delete-users.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import UsersTbody from './UsersTbody.tsx'
import CreateUser from './CreateUser.tsx'
import { getToken } from '../../lib/get-token.ts'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import type { IUsers } from '../../shared/types/users.type.ts'
import UpdateUser from './UpdateUser.tsx'
import ControlBox from '../../components/ui/ControlBox/ControlBox.tsx'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageChanger from '../../components/ui/PageChanger/PageChanger.tsx'

const UsersPage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<IUsers | null>(null)
  const [page, setPage] = useState<number>(1)

  const addToast = useAddToast()

  const queryClient = useQueryClient()

  const { data = { users: [], count: 0 }, isPending } = useQuery({
    queryFn: () => getUsers(getToken(), page),
    queryKey: [QUERY_KEYS.USERS, page],
    placeholderData: keepPreviousData,
  })

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteUsers(getToken(), ids),
    onSuccess: async (data) => {
      addToast(data)
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
        setCheckboxes([])
      }
    },
  })

  if (isPending) {
    return <PageLoader />
  }

  const { users, count } = data

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

  const onHandleEdit = (user: IUsers) => {
    setEditUser(user)
    setIsUpdateModalOpen(true)
  }

  const onChangePage = (isIncrement: boolean): void => {
    setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
  }

  return (
    <>
      <div className={'flex flex-col p-4 justify-between h-full gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <ControlBox
            title={'Users'}
            onAdd={() => setIsCreateModalOpen(true)}
            onDelete={() => deleteMutation.mutate(checkboxes)}
            isPending={deleteMutation.isPending}
            isChecked={checkboxes.length > 0}
            addLabel={'user'}
            deleteLabel={'user(s)'}
          />
          <div className={'overflow-x-auto'}>
            <table className={'text-left text-nowrap border border-collapse'}>
              <Thead
                columns={userColumns}
                isChecked={
                  users.length > 0 && users.length === checkboxes.length
                }
                onChange={toggleAll}
              />
              <tbody className={'divide-y text-sm'}>
                {!!users.length &&
                  users.map((item, index) => (
                    <UsersTbody
                      onEdit={() => onHandleEdit(item)}
                      user={item}
                      key={item.id}
                      isEven={index % 2 === 0}
                      isChecked={checkboxes.includes(item.id)}
                      onChange={() => onHandleCheck(item.id)}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {!users.length && <EmptyTable />}
        </div>
        {count > 10 && (
          <PageChanger
            page={page}
            count={count}
            onBack={() => onChangePage(false)}
            onForward={() => onChangePage(true)}
          />
        )}
      </div>
      {isCreateModalOpen && <CreateUser setIsOpen={setIsCreateModalOpen} />}
      {isUpdateModalOpen && !!editUser && (
        <UpdateUser user={editUser} setIsOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}

export default UsersPage
