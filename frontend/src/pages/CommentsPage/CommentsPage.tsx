import type { TComment } from '../../shared/types/comments.type.ts'
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
import { commentColumns } from './comments-page.data.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import CreateComment from './CreateComment.tsx'
import UpdateComment from './UpdateComment.tsx'
import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'

const CommentsPage = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<TComment>()

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
  } = usePageMethods(QUERY_KEYS.COMMENT, API_ENDPOINTS.COMMENTS)

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
        title={MANY_UPPER_LABELS.COMMENTS}
        deleteLabel={MANY_LOWER_LABELS.COMMENTS}
        addLabel={LOWER_LABELS.COMMENTS}
        columns={commentColumns}
        toggleAll={toggleAll}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.commentRating, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.episodeId, type: 'text' },
              { value: item.text, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.userId, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.COMMENTS}
            label={`${LOWER_LABELS.COMMENTS}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateComment
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateComment
          clearCheckBoxes={clearCheckBoxes}
          comment={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default CommentsPage
