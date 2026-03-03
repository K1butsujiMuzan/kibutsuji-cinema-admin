import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import type { TRating } from '../../shared/types/ratings.type.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import {
  LOWER_LABELS,
  MANY_LOWER_LABELS,
  MANY_UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import { ratingsColumns } from './ratings-page.data.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import CreateRating from './CreateRating.tsx'
import UpdateRating from './UpdateRating.tsx'

const RatingsPage = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<TRating>()

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
  } = usePageMethods(QUERY_KEYS.RATINGS, API_ENDPOINTS.RATINGS)

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
        title={MANY_UPPER_LABELS.RATINGS}
        deleteLabel={MANY_LOWER_LABELS.RATINGS}
        addLabel={LOWER_LABELS.RATINGS}
        columns={ratingsColumns}
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
              { value: item.rating, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.RATINGS}
            label={`${LOWER_LABELS.RATINGS}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateRating
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateRating
          clearCheckBoxes={clearCheckBoxes}
          animeRating={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default RatingsPage
