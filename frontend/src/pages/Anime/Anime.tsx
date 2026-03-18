import { useCallback, useState } from 'react'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import {
  animeColumns,
  initialAnimeData,
  type TAnimeFormData,
} from './anime.data.ts'
import type { TAnimeWithGenres } from '../../shared/types/anime.type.ts'
import AnimeForm from './AnimeForm.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import { PAGE_TITLES } from '../../configs/pages.config.ts'
import { dateFormater } from '../../lib/date-formater.ts'

const Anime = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TFormInformation<TAnimeFormData>>(initialAnimeData)

  const onHandleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setInformation(initialAnimeData)
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
  } = usePageMethods('ANIME', PAGE_TITLES.ANIME)

  if (isPending) {
    return <PageLoader />
  }

  const onHandleEdit = (anime: TAnimeWithGenres) => {
    const {
      id,
      access,
      type,
      status,
      ageLimit,
      title,
      genres,
      originalTitle,
      releaseDate,
      image,
      description,
      slug,
      episodesLength,
      episodesCount,
    } = anime
    setInformation({
      data: {
        id,
        access,
        type,
        status,
        ageLimit,
        title,
        slug,
        episodesLength,
        episodesCount,
        genreNames: genres.map((item) => item.name).join(' '),
        originalTitle: originalTitle || '',
        releaseDate: dateFormater(releaseDate),
        description: description || '',
        image: image || '',
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
        columns={animeColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'ANIME'}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            data={[
              { value: item.id, type: 'text' },
              { value: item.access, type: 'text' },
              { value: item.ageLimit, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.description, type: 'nullable' },
              { value: item.episodesCount, type: 'text' },
              { value: item.episodesLength, type: 'text' },
              { value: item.episodesReleased, type: 'text' },
              { value: item.image, type: 'nullable' },
              { value: item.originalTitle, type: 'nullable' },
              { value: item.rating, type: 'text' },
              { value: item.releaseDate, type: 'date' },
              { value: item.slug, type: 'text' },
              { value: item.status, type: 'text' },
              { value: item.title, type: 'text' },
              { value: item.type, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.views, type: 'text' },
              {
                value: item.genres.map((genre) => genre.name).join(' '),
                type: 'text',
              },
            ]}
            onEdit={() => onHandleEdit(item)}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            name={LOWER_LABELS.ANIME}
            label={`${LOWER_LABELS.ANIME}: ${item.slug}`}
            id={item.id}
          />
        ))}
      </PageWrapper>
      {isModalOpen && (
        <AnimeForm
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleModalClose}
          operationType={information.type}
          anime={information.data}
        />
      )}
    </>
  )
}

export default Anime
