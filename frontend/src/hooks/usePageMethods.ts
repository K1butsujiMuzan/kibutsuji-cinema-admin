import { useCallback, useState } from 'react'
import { useQuerySuccess } from './useQuerySuccess.ts'
import { QUERY_KEYS } from '../constants/query-keys.ts'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getData } from '../services/get-data.ts'
import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import { deleteData } from '../services/delete-data.ts'
import type { TGenre } from '../shared/types/genres.type.ts'
import type { TEpisode } from '../shared/types/episode.type.ts'
import type { TAnime } from '../shared/types/anime.type.ts'
import type { TUser } from '../shared/types/users.type.ts'

type TServerDataType = {
  [QUERY_KEYS.ANIME]: TAnime[]
  [QUERY_KEYS.EPISODES]: TEpisode[]
  [QUERY_KEYS.GENRES]: TGenre[]
  [QUERY_KEYS.USERS]: TUser[]
}

export const usePageMethods = <T extends keyof TServerDataType>(
  queryKey: T,
  endPoint: (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS],
) => {
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)

  const clearCheckBoxes = useCallback(() => {
    setCheckboxes([])
  }, [])

  const onChangePage = useCallback(
    (isIncrement: boolean): void => {
      setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
      clearCheckBoxes()
    },
    [clearCheckBoxes],
  )

  const onSuccess = useQuerySuccess(queryKey, undefined, clearCheckBoxes)

  const query = useQuery({
    queryFn: () => getData(page, endPoint),
    queryKey: [queryKey, page],
    placeholderData: keepPreviousData,
  })

  const { isPending, isFetching, data } = query

  const queryData = data as
    | ({ [K in T]: TServerDataType[T] } & { count: number })
    | undefined

  const serverData = queryData?.[queryKey] ?? []
  const count = queryData?.count ?? 0

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return deleteData(ids, endPoint)
    },
    onSuccess,
  })

  const onHandleDelete = () => {
    deleteMutation.mutate(checkboxes)
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
    if (serverData.length > 0 && serverData.length === checkboxes.length) {
      clearCheckBoxes()
    } else {
      const allData: string[] = serverData.map((item) => item.id)
      setCheckboxes([...allData])
    }
  }

  return {
    clearCheckBoxes,
    onChangePage,
    isPending,
    isFetching,
    count,
    serverData,
    onHandleDelete,
    checkboxes,
    page,
    isDeletePending: deleteMutation.isPending,
    onHandleCheck,
    toggleAll,
  }
}
