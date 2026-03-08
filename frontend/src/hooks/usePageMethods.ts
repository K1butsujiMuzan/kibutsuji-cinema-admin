import { type ChangeEvent, useCallback, useState } from 'react'
import { useQuerySuccess } from './useQuerySuccess.ts'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getData } from '../services/get-data.ts'
import { deleteData } from '../services/delete-data.ts'
import { useTitle } from './useTitle.ts'
import type { PAGE_TITLES } from '../configs/pages.config.ts'
import { useDebounce } from './useDebounce.ts'
import type { TCrudEndpointKeys } from '../configs/table-key.config.ts'
import { QUERY_KEYS } from '../configs/query-keys.config.ts'

export const usePageMethods = <T extends TCrudEndpointKeys>(
  tableKey: T,
  title: (typeof PAGE_TITLES)[keyof typeof PAGE_TITLES],
) => {
  useTitle(title)
  const [checkboxes, setCheckboxes] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  const debouncedValue = useDebounce(search)

  const clearCheckBoxes = useCallback(() => {
    setCheckboxes([])
  }, [])

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkboxes.length > 0) {
      clearCheckBoxes()
    }
    setSearch(event.target.value)
    setPage(1)
  }

  const onChangePage = useCallback(
    (isIncrement: boolean): void => {
      setPage((prevState) => (isIncrement ? prevState + 1 : prevState - 1))
      clearCheckBoxes()
    },
    [clearCheckBoxes],
  )

  const onSuccess = useQuerySuccess(
    QUERY_KEYS[tableKey],
    undefined,
    clearCheckBoxes,
  )

  const query = useQuery({
    queryFn: () => getData(page, tableKey, debouncedValue),
    queryKey: [QUERY_KEYS[tableKey], page, debouncedValue],
    placeholderData: keepPreviousData,
  })

  const { isPending, isFetching, data } = query

  const serverData = data?.data ?? []
  const count = data?.count ?? 0

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return deleteData(ids, tableKey)
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
    onSearchChange,
    search,
  }
}
