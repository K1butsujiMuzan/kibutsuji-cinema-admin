import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getToken } from '../../lib/get-token.ts'
import { useState } from 'react'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { getData } from '../../services/get-data.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import ControlBox from '../../components/ui/ControlBox/ControlBox.tsx'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import PageChanger from '../../components/ui/PageChanger/PageChanger.tsx'
import { animeColumns, type TAnimeFormData } from './anime-page.data.ts'
import AnimeTBody from './AnimeTBody.tsx'
import type { TAnime } from '../../shared/types/anime.type.ts'
import { deleteData } from '../../services/delete-data.ts'
import AnimeForm from './AnimeForm.tsx'
import { useQuerySuccess } from '../../lib/useQuerySuccess.ts'

type TAnimeInformation = {
  anime: TAnimeFormData
  type: 'create' | 'update'
}

const initialFormData: TAnimeInformation = {
  anime: {
    id: '',
    slug: '',
    type: 'TVSERIES',
    ageLimit: 'AGE_6',
    description: '',
    episodesCount: 0,
    episodesLength: 0,
    image: '',
    genres: '',
    releaseDate: new Date().toISOString().split('T')[0],
    originalTitle: '',
    title: '',
    status: 'ANNOUNCEMENT',
  },
  type: 'create',
}

const AnimePage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [information, setInformation] =
    useState<TAnimeInformation>(initialFormData)
  const [page, setPage] = useState<number>(1)

  const onSuccess = useQuerySuccess(QUERY_KEYS.ANIME, undefined, setCheckboxes)

  const animeQuery = useQuery({
    queryFn: () => getData(getToken(), page, API_ENDPOINTS.ANIME),
    queryKey: [QUERY_KEYS.ANIME, page],
    placeholderData: keepPreviousData,
  })

  const { isPending, isFetching, data } = animeQuery
  const queryData = (data as
    | { anime: TAnime[]; count: number }
    | undefined) ?? { anime: [], count: 0 }
  const { anime, count } = queryData

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return deleteData(getToken(), ids, API_ENDPOINTS.ANIME, 'Anime')
    },
    onSuccess,
  })

  if (isPending || !anime) {
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
    if (anime.length > 0 && anime.length === checkboxes.length) {
      setCheckboxes([])
    } else {
      const allAnime: string[] = anime.map((item) => item.id)
      setCheckboxes([...allAnime])
    }
  }

  const onHandleEdit = (anime: TAnime) => {
    const {
      id,
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
      anime: {
        id,
        type,
        status,
        ageLimit,
        title,
        slug,
        episodesLength,
        episodesCount,
        genres: genres.map((item) => item.id).join(' '),
        originalTitle: originalTitle || '',
        releaseDate: releaseDate.split('T')[0],
        description: description || '',
        image: image || '',
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
            title={'Anime'}
            onAdd={onHandleCreate}
            onDelete={() => deleteMutation.mutate(checkboxes)}
            isPending={deleteMutation.isPending}
            isChecked={checkboxes.length > 0}
            addLabel={'anime'}
            deleteLabel={'anime'}
          />
          {anime.length > 0 && (
            <div className={'overflow-x-auto'}>
              <table className={'text-left text-nowrap border border-collapse'}>
                <Thead
                  columns={animeColumns}
                  isChecked={
                    anime.length > 0 && anime.length === checkboxes.length
                  }
                  onChange={toggleAll}
                />
                <tbody className={'divide-y text-sm'}>
                  {anime.map((item, index) => (
                    <AnimeTBody
                      onEdit={() => onHandleEdit(item)}
                      anime={item}
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
          {!anime.length && <EmptyTable />}
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
        <AnimeForm
          setIsOpen={setIsModalOpen}
          operationType={information.type}
          anime={information.anime}
        />
      )}
    </>
  )
}

export default AnimePage
