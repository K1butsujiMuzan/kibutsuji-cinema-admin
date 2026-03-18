import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import { likesColumns } from './likes.data.ts'
import CreateLike from './CreateLike.tsx'
import UpdateLike from './UpdateLike.tsx'
import { PAGE_TITLES } from '../../configs/pages.config.ts'
import type { TABLE_KEY } from '../../configs/table-key.config.ts'

const Likes = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<typeof TABLE_KEY.LIKES>()

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
  } = usePageMethods('LIKES', PAGE_TITLES.LIKES)

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
        columns={likesColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'LIKES'}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.commentId, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
              { value: item.value, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.LIKES}
            label={`${LOWER_LABELS.LIKES}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateLike
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateLike
          clearCheckBoxes={clearCheckBoxes}
          like={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default Likes
