import { useCreateAndUpdatePageMethods } from '../../hooks/useCreateAndUpdatePageMethods.ts'
import type { TEpisode } from '../../shared/types/episodes.type.ts'
import { usePageMethods } from '../../hooks/usePageMethods.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import PageWrapper from '../../components/ui/PageWrapper/PageWrapper.tsx'
import { LOWER_LABELS } from '../../constants/service-message-labels.ts'
import { episodesColumns } from './episodes-page.data.ts'
import Tbody from '../../components/ui/Tbody/Tbody.tsx'
import CreateEpisode from './CreateEpisode.tsx'
import UpdateEpisode from './UpdateEpisode.tsx'
import { PAGE_TITLES } from '../../configs/pages.config.ts'

const EpisodesPage = () => {
  const {
    information,
    onHandleCreate,
    onHandleCreateModalClose,
    onHandleUpdateModalClose,
    isCreateModalOpen,
    onHandleEdit,
    isUpdateModalOpen,
  } = useCreateAndUpdatePageMethods<TEpisode>()

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
  } = usePageMethods(QUERY_KEYS.EPISODES, 'EPISODES', PAGE_TITLES.EPISODES)

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
        columns={episodesColumns}
        toggleAll={toggleAll}
        onSearch={onSearchChange}
        search={search}
        tableKey={'EPISODES'}
      >
        {serverData.map((item, index) => (
          <Tbody
            key={item.id}
            onEdit={() => onHandleEdit(item)}
            data={[
              { value: item.id, type: 'text' },
              { value: item.animeId, type: 'text' },
              { value: item.createdAt, type: 'date' },
              { value: item.episodeNumber, type: 'text' },
              { value: item.title, type: 'text' },
              { value: item.updatedAt, type: 'date' },
              { value: item.views, type: 'text' },
            ]}
            isEven={index % 2 === 0}
            isChecked={checkboxes.includes(item.id)}
            onChange={() => onHandleCheck(item.id)}
            id={item.id}
            name={LOWER_LABELS.EPISODES}
            label={`${LOWER_LABELS.EPISODES}: ${item.id}`}
          />
        ))}
      </PageWrapper>
      {isCreateModalOpen && (
        <CreateEpisode
          clearCheckBoxes={clearCheckBoxes}
          closeModal={onHandleCreateModalClose}
        />
      )}
      {isUpdateModalOpen && information && (
        <UpdateEpisode
          clearCheckBoxes={clearCheckBoxes}
          episode={information}
          closeModal={onHandleUpdateModalClose}
        />
      )}
    </>
  )
}

export default EpisodesPage
