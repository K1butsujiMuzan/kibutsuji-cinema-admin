import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import {
  LOWER_LABELS,
  MANY_LOWER_LABELS,
  MANY_UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import type { TList } from '../../shared/types/lists.type.ts'
import { listsColumns } from './lists-page.data.ts'
import CreateList from './CreateList.tsx'
import UpdateList from './UpdateList.tsx'
import { PAGE_TITLES } from '../../configs/pages.config.ts'

const ListsPage = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<TList>()

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
  } = usePageMethods(QUERY_KEYS.LISTS, API_ENDPOINTS.LISTS, PAGE_TITLES.LISTS)

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
        title={MANY_UPPER_LABELS.LISTS}
        deleteLabel={MANY_LOWER_LABELS.LISTS}
        addLabel={LOWER_LABELS.LISTS}
        columns={listsColumns}
        toggleAll={toggleAll}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.animeId, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.list, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.LISTS}
            label={`${LOWER_LABELS.LISTS}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateList
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateList
          clearCheckBoxes={clearCheckBoxes}
          animeList={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default ListsPage
