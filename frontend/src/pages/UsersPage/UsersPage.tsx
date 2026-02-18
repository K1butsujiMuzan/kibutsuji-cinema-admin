import { getData } from '../../services/get-data.ts'
import { userColumns } from './user-page.data.ts'
import { useState } from 'react'
import { deleteData } from '../../services/delete-data.ts'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import UsersTbody from './UsersTbody.tsx'
import CreateUser from './CreateUser.tsx'
import { getToken } from '../../lib/get-token.ts'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import type { IUsers } from '../../shared/types/users.type.ts'
import UpdateUser from './UpdateUser.tsx'
import ControlBox from '../../components/ui/ControlBox/ControlBox.tsx'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageChanger from '../../components/ui/PageChanger/PageChanger.tsx'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { useQuerySuccess } from '../../lib/useQuerySuccess.ts'

const UsersPage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<IUsers | null>(null)
  const [page, setPage] = useState<number>(1)

  const onSuccess = useQuerySuccess(QUERY_KEYS.USERS, undefined, setCheckboxes)

  const usersQuery = useQuery({
    queryFn: () => getData(getToken(), page, API_ENDPOINTS.USERS),
    queryKey: [QUERY_KEYS.USERS, page],
    placeholderData: keepPreviousData,
  })

  const { isPending, isFetching, data } = usersQuery
  const queryData = (data as
    | { users: IUsers[]; count: number }
    | undefined) ?? { users: [], count: 0 }
  const { users, count } = queryData

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) =>
      deleteData(getToken(), ids, API_ENDPOINTS.USERS, 'User(s)'),
    onSuccess,
  })

  if (isPending || !users) {
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

  const onHandleEdit = (user: IUsers) => {
    setEditUser(user)
    setIsUpdateModalOpen(true)
  }

  const onHandleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const onChangePage = (isIncrement: boolean): void => {
    setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
    setCheckboxes([])
  }

  return (
    <>
      <div className={'flex flex-col p-4 justify-between h-full gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <ControlBox
            title={'Users'}
            onAdd={onHandleCreate}
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
            disabled={isFetching}
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
