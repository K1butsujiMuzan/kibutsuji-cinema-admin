import { useCallback, useState } from 'react'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import type { TEpisode } from '../../shared/types/episodes.type.ts'
import {
  episodesColumns,
  initialEpisodeData,
  type TEpisodeFormData,
} from './episodes-page.data.ts'
import EpisodeForm from './EpisodeForm.tsx'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import {
  LOWER_LABELS,
  MANY_LOWER_LABELS,
  MANY_UPPER_LABELS,
} from '../../constants/service-message-labels.ts'

const EpisodesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TFormInformation<TEpisodeFormData>>(initialEpisodeData)

  const onHandleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const onHandleCreate = useCallback(() => {
    setInformation(initialEpisodeData)
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
  } = usePageMethods(QUERY_KEYS.EPISODES, API_ENDPOINTS.EPISODES)

  if (isPending) {
    return <PageLoader />
  }

  const onHandleEdit = (episode: TEpisode) => {
    const { animeId, id, title, episodeNumber, views } = episode
    setInformation({
      data: {
        id,
        animeId,
        title,
        episodeNumber,
        views,
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
        title={MANY_UPPER_LABELS.EPISODES}
        deleteLabel={MANY_LOWER_LABELS.EPISODES}
        addLabel={LOWER_LABELS.EPISODES}
        columns={episodesColumns}
        toggleAll={toggleAll}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            data={[
              { value: item.id, type: 'text' },
              { value: item.animeId, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.episodeNumber, type: 'text' },
              { value: item.title, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.views, type: 'text' },
            ]}
            onEdit={() => onHandleEdit(item)}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.EPISODES}
            label={`${LOWER_LABELS.EPISODES}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isModalOpen && (
        <EpisodeForm
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleModalClose}
          operationType={information.type}
          episode={information.data}
        />
      )}
    </>
  )
}

export default EpisodesPage
