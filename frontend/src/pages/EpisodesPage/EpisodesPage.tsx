import { useState } from 'react'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getData } from '../../services/get-data.ts'
import { getToken } from '../../lib/get-token.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { deleteData } from '../../services/delete-data.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import ControlBox from '../../components/ui/ControlBox/ControlBox.tsx'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import PageChanger from '../../components/ui/PageChanger/PageChanger.tsx'
import type { TEpisode } from '../../shared/types/episodes.type.ts'
import { episodesColumns, type TEpisodeFormData } from './episodes-page.data.ts'
import EpisodeTBody from './EpisodeTBody.tsx'
import EpisodeForm from './EpisodeForm.tsx'
import { useQuerySuccess } from '../../lib/useQuerySuccess.ts'

type TEpisodeInformation = {
  episode: TEpisodeFormData
  type: 'create' | 'update'
}

const initialFormData: TEpisodeInformation = {
  episode: {
    id: '',
    animeId: '',
    episodeNumber: 1,
    views: 0,
    title: '',
  },
  type: 'create',
}

const EpisodesPage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TEpisodeInformation>(initialFormData)
  const [page, setPage] = useState<number>(1)

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.EPISODES,
    undefined,
    setCheckboxes,
  )

  const episodeQuery = useQuery({
    queryFn: () => getData(getToken(), page, API_ENDPOINTS.EPISODES),
    queryKey: [QUERY_KEYS.EPISODES, page],
    placeholderData: keepPreviousData,
  })

  const { isPending, isFetching, data } = episodeQuery
  const queryData = (data as
    | { episodes: TEpisode[]; count: number }
    | undefined) ?? { episodes: [], count: 0 }
  const { episodes, count } = queryData

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) =>
      deleteData(getToken(), ids, API_ENDPOINTS.EPISODES, 'Episode(s)'),
    onSuccess,
  })

  if (isPending || !episodes) {
    return <PageLoader />
  }

  const onHandleCheck = (id: string) => {
    const isChecked: boolean = checkboxes.includes(id)
    if (isChecked) {
      setCheckboxes((prevState) => prevState.filter((item) => item !== id))
    } else {
      setCheckboxes((prevState) => [...prevState, id])
    }
  }

  const toggleAll = () => {
    if (episodes.length > 0 && episodes.length === checkboxes.length) {
      setCheckboxes([])
    } else {
      const allEpisodes: string[] = episodes.map((item) => item.id)
      setCheckboxes([...allEpisodes])
    }
  }

  const onHandleEdit = (episode: TEpisode) => {
    const { animeId, id, title, episodeNumber, views } = episode
    setInformation({
      episode: {
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

  const onHandleCreate = () => {
    setInformation(initialFormData)
    setIsModalOpen(true)
  }

  const onChangePage = (isIncrement: boolean): void => {
    setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
    setCheckboxes([])
  }

  return (
    <>
      <div className={'flex flex-col p-4 justify-between h-full gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <ControlBox
            title={'Episodes'}
            onAdd={onHandleCreate}
            onDelete={() => deleteMutation.mutate(checkboxes)}
            isPending={deleteMutation.isPending}
            isChecked={checkboxes.length > 0}
            addLabel={'episode'}
            deleteLabel={'episode(s)'}
          />
          {episodes.length > 0 && (
            <div className={'overflow-x-auto'}>
              <table className={'text-left text-nowrap border border-collapse'}>
                <Thead
                  columns={episodesColumns}
                  isChecked={
                    episodes.length > 0 && episodes.length === checkboxes.length
                  }
                  onChange={toggleAll}
                />
                <tbody className={'divide-y text-sm'}>
                  {episodes.map((item, index) => (
                    <EpisodeTBody
                      onEdit={() => onHandleEdit(item)}
                      episode={item}
                      key={item.id}
                      isEven={index % 2 === 0}
                      isChecked={checkboxes.includes(item.id)}
                      onChange={() => onHandleCheck(item.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!episodes.length && <EmptyTable />}
        </div>
        {count > 10 && (
          <PageChanger
            disabled={isFetching}
            page={page}
            count={count}
            onBack={() => onChangePage(false)}
            onForward={() => onChangePage(true)}
          />
        )}
      </div>
      {isModalOpen && (
        <EpisodeForm
          setIsOpen={setIsModalOpen}
          operationType={information.type}
          episode={information.episode}
        />
      )}
    </>
  )
}

export default EpisodesPage
