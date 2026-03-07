import { userColumns } from './user-page.data.ts'
import CreateUser from './CreateUser.tsx'
import UpdateUser from './UpdateUser.tsx'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'
import type { TABLE_KEY } from '../../configs/table-key.config.ts'

const UsersPage = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<typeof TABLE_KEY.USERS>()

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
    onSearchChange,
    search,
  } = usePageMethods('USERS', PAGE_TITLES.USERS)

  if (isPending) {
    return <PageLoader />
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
        columns={userColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'USERS'}
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
            name={LOWER_LABELS.USERS}
            label={`${LOWER_LABELS.USERS}: ${item.email}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateUser
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateUser
          clearCheckBoxes={clearCheckBoxes}
          user={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default UsersPage
