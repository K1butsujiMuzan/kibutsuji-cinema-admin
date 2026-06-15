import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import { useCallback, useState } from 'react'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { authorColumns, initialAuthorData } from './authors.data.ts'
import type {
  TAuthor,
  TAuthorFormData,
} from '../../shared/types/tables/authors.type.ts'
import AuthorForm from './AuthorForm.tsx'

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TFormInformation<TAuthorFormData>>(initialAuthorData)

  const onHandleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setInformation(initialAuthorData)
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
    onSearchChange,
    search,
  } = usePageMethods('AUTHORS', PAGE_TITLES.AUTHORS)

  if (isPending) {
    return <PageLoader />
  }

  const onHandleEdit = (author: TAuthor) => {
    const { id, englishName, originalName, image, slug } = author
    setInformation({
      data: {
        id,
        englishName,
        originalName,
        image,
        slug,
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
        columns={authorColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'AUTHORS'}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            data={[
              { value: item.id, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.englishName, type: 'text' },
              { value: item.image, type: 'nullable' },
              { value: item.originalName, type: 'nullable' },
              { value: item.slug, type: 'text' },
              { value: item.updatedAt, type: 'date' },
            ]}
            onEdit={() => onHandleEdit(item)}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            label={`${LOWER_LABELS.AUTHORS}: ${item.englishName}`}
            id={item.id}
            name={LOWER_LABELS.AUTHORS}
          />
        ))}
      </PageWrapper>
      {isModalOpen && (
        <AuthorForm
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleModalClose}
          operationType={information.type}
          author={information.data}
        />
      )}
    </>
  )
}

export default Authors
