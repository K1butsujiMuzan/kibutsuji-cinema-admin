import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getToken } from '../../lib/get-token.ts'
import { useState } from 'react'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { getData } from '../../services/get-data.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import PageLoader from '../../components/ui/PageLoader/PageLoader.tsx'
import ControlBox from '../../components/ui/ControlBox/ControlBox.tsx'
import Thead from '../../components/ui/Thead/Thead.tsx'
import EmptyTable from '../../components/ui/EmptyTable/EmptyTable.tsx'
import PageChanger from '../../components/ui/PageChanger/PageChanger.tsx'
import { animeColumns } from './anime-page.data.ts'
import AnimeTBody from './AnimeTBody.tsx'
import type { TAnime } from '../../shared/types/anime.type.ts'
import { deleteData } from '../../services/delete-data.ts'
import CreateAnime from './CreateAnime.tsx'
import UpdateAnime from './UpdateAnime.tsx'

const AnimePage = () => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [editAnime, setEditAnime] = useState<TAnime | null>(null)
  const [page, setPage] = useState<number>(1)

  console.log(isUpdateModalOpen, editAnime)

  const addToast = useAddToast()

  const queryClient = useQueryClient()

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
    mutationFn: (ids: string[]) =>
      deleteData(getToken(), ids, API_ENDPOINTS.ANIME, 'Anime'),
    onSuccess: async (data) => {
      addToast(data)
      if (data.isSuccess) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ANIME],
          exact: false,
        })
        setCheckboxes([])
      }
    },
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
    if (checkboxes.length === anime.length) {
      setCheckboxes([])
    } else {
      const allAnime: string[] = anime.map((item) => item.id)
      setCheckboxes([...allAnime])
    }
  }

  const onHandleEdit = (anime: TAnime) => {
    setEditAnime(anime)
    setIsUpdateModalOpen(true)
  }

  const onChangePage = (isIncrement: boolean): void => {
    setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
  }

  return (
    <>
      <div className={'flex flex-col p-4 justify-between h-full gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <ControlBox
            title={'Anime'}
            onAdd={() => setIsCreateModalOpen(true)}
            onDelete={() => deleteMutation.mutate(checkboxes)}
            isPending={deleteMutation.isPending}
            isChecked={checkboxes.length > 0}
            addLabel={'anime'}
            deleteLabel={'anime'}
          />
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
                {!!anime.length &&
                  anime.map((item, index) => (
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
      {isCreateModalOpen && <CreateAnime setIsOpen={setIsCreateModalOpen} />}
      {isUpdateModalOpen && !!editAnime && (
        <UpdateAnime anime={editAnime} setIsOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}

export default AnimePage
