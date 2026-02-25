import { userColumns } from './user-page.data.ts'
import { useCallback, useState } from 'react'
import CreateUser from './CreateUser.tsx'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import type { TUser } from '../../shared/types/users.type.ts'
import UpdateUser from './UpdateUser.tsx'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import { usePageMethods } from '../../hooks/usePageMethods.ts'

const UsersPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<TUser | null>(null)

  const onHandleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false)
  }, [])

  const onHandleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false)
  }, [])

  const onHandleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const {
    count,
    clearCheckBoxes,
    serverData,
    onChangePage,
    onHandleDelete,
    isFetching,
    isPending,
    checkboxes,
    toggleAll,
    onHandleCheck,
    page,
    isDeletePending,
  } = usePageMethods(QUERY_KEYS.USERS, API_ENDPOINTS.USERS)

  if (isPending) {
    return <PageLoader />
  }

  const onHandleEdit = (user: TUser) => {
    setEditUser(user)
    setIsUpdateModalOpen(true)
  }

  return (
    <>
      <PageWrapper
        count={count}
        page={page}
        isFetching={isFetching}
        isPending={isDeletePending}
        onChangePage={onChangePage}
        isEmptyData={!serverData.length}
        isChecked={checkboxes.length > 0}
        isAllChecked={serverData.length === checkboxes.length}
        onHandleCreate={onHandleCreate}
        onDelete={onHandleDelete}
        title={'Users'}
        deleteLabel={'user(s)'}
        addLabel={'user'}
        columns={userColumns}
        toggleAll={toggleAll}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.email, type: 'text' },
              { value: item.emailVerified, type: 'boolean' },
              { value: item.image, type: 'nullable' },
              { value: item.isReceiveNotifications, type: 'boolean' },
              { value: item.name, type: 'text' },
              { value: item.role, type: 'text' },
              { value: item.updatedAt, type: 'date' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={'user'}
            label={`user: ${item.email}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateUser
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && !!editUser && (
        <UpdateUser
          clearCheckBoxes={clearCheckBoxes}
          user={editUser}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default UsersPage
