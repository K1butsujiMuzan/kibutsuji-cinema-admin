import { QUERY_KEYS } from '../../constants/query-keys.ts'
import {
  genresColumns,
  initialGenreData,
  type TGenreFormData,
} from './genres-page.data.ts'
import { useCallback, useState } from 'react'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import type { TGenre } from '../../shared/types/genres.type.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import GenreForm from './GenreForm.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'

const GenresPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TFormInformation<TGenreFormData>>(initialGenreData)

  const onHandleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setInformation(initialGenreData)
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
  } = usePageMethods(QUERY_KEYS.GENRES, API_ENDPOINTS.GENRES)

  if (isPending) {
    return <PageLoader />
  }

  const onHandleEdit = (genre: TGenre) => {
    const { id, name } = genre
    setInformation({
      data: {
        id,
        name,
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
        title={'Genres'}
        deleteLabel={'genre(s)'}
        addLabel={'genre'}
        columns={genresColumns}
        toggleAll={toggleAll}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            data={[
              { value: item.id, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.name, type: 'text' },
              { value: item.updatedAt, type: 'date' },
            ]}
            onEdit={() => onHandleEdit(item)}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            label={`genre: ${item.name}`}
            id={item.id}
            name={'genre'}
          />
        ))}
      </PageWrapper>
      {isModalOpen && (
        <GenreForm
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleModalClose}
          operationType={information.type}
          genre={information.data}
        />
      )}
    </>
  )
}

export default GenresPage
