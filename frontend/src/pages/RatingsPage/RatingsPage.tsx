import { useCallback, useState } from 'react'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import {
  initialRatingData,
  ratingsColumns,
  type TRatingFormData,
} from './ratings-page.data.ts'
import type { TRating } from '../../shared/types/ratings.type.ts'
import RatingForm from './RatingForm.tsx'
import {
  LOWER_LABELS,
  MANY_LOWER_LABELS,
  MANY_UPPER_LABELS,
} from '../../constants/service-message-labels.ts'

const RatingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TFormInformation<TRatingFormData>>(initialRatingData)

  const onHandleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setInformation(initialRatingData)
    setIsModalOpen(true)
  }, [])

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

  const onHandleEdit = (animeRating: TRating) => {
    const { id, animeId, rating, userId } = animeRating
    setInformation({
      data: {
        id,
        rating,
        userId,
        animeId,
      },
      type: 'update',
    })
    setIsModalOpen(true)
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
            data={[
              { value: item.id, type: 'text' },
              { value: item.animeId, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.rating, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
            ]}
            onEdit={() => onHandleEdit(item)}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.RATINGS}
            label={`${LOWER_LABELS.RATINGS}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isModalOpen && (
        <RatingForm
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleModalClose}
          operationType={information.type}
          animeRating={information.data}
        />
      )}
    </>
  )
}

export default RatingsPage
