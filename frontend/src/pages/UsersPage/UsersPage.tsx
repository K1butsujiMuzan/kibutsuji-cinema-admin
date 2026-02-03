import { getUsers } from '../../services/get-users.ts'
import { userColumns } from './user-page.data.ts'
import { useState } from 'react'
import { deleteUsers } from '../../services/delete-users.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import UsersTbody from './UsersTbody.tsx'
import AddButton from '../../components/ui/AddButton/AddButton.tsx'
import DeleteButton from '../../components/ui/DeleteButton/DeleteButton.tsx'
import CreateUser from './CreateUser.tsx'
import { getToken } from '../../lib/get-token.ts'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query-keys.ts'

const UsersPage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const addToast = useAddToast()

  const queryClient = useQueryClient()

  const { data } = useSuspenseQuery({
    queryFn: () => getUsers(getToken()),
    queryKey: [QUERY_KEYS.USERS],
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => deleteUsers(getToken(), ids),
    onSuccess: (data) => {
      addToast(data)
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
        setCheckboxes([])
      }
    },
  })

  const onHandleCheck = (id: string) => {
    const isChecked: boolean = checkboxes.includes(id)
    if (isChecked) {
      setCheckboxes((prevState) => prevState.filter((item) => item !== id))
    } else {
      setCheckboxes((prevState) => [...prevState, id])
    }
  }

  const toggleAll = () => {
    if (checkboxes.length === data.length) {
      setCheckboxes([])
    } else {
      const allUsers: string[] = data.map((user) => user.id)
      setCheckboxes([...allUsers])
    }
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
            <DeleteButton
              label={'user(s)'}
              onClick={() => mutate(checkboxes)}
              disabled={isPending}
            />
          )}
        </div>
        <div className={'overflow-x-auto'}>
          <table
            className={'text-left text-nowrap border w-full border-collapse'}
          >
            <Thead
              columns={userColumns}
              isChecked={data.length > 0 && data.length === checkboxes.length}
              onChange={toggleAll}
            />
            <tbody className={'divide-y text-sm'}>
              {!!data.length &&
                data.map((item, index) => (
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
        </div>
        {!data.length && <EmptyTable />}
      </div>
      {isCreateModalOpen && <CreateUser setIsOpen={setIsCreateModalOpen} />}
    </>
  )
}

export default UsersPage
