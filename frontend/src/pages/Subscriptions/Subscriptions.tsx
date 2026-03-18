import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import type { TABLE_KEY } from '../../configs/table-key.config.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import { subscriptionsColumns } from './subscriptions.data.ts'
import CreateSubscription from './CreateSubscription.tsx'
import UpdateSubscription from './UpdateSubscription.tsx'

const Subscriptions = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<typeof TABLE_KEY.SUBSCRIPTIONS>()

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
  } = usePageMethods('SUBSCRIPTIONS', PAGE_TITLES.SUBSCRIPTIONS)

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
        columns={subscriptionsColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'SUBSCRIPTIONS'}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.endDate, type: 'date' },
              { value: item.type, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.SUBSCRIPTIONS}
            label={`${LOWER_LABELS.SUBSCRIPTIONS}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateSubscription
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateSubscription
          clearCheckBoxes={clearCheckBoxes}
          subscription={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default Subscriptions
