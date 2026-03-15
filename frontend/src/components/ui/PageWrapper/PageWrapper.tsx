import PageChanger from '../PageChanger/PageChanger.tsx'
import ControlBox from '../ControlBox/ControlBox.tsx'
import Thead from '../Thead/Thead.tsx'
import EmptyTable from '../EmptyTable/EmptyTable.tsx'
import type { ChangeEvent } from 'react'
import SearchInput from '../SearchInput/SearchInput.tsx'
import {
  MANY_UPPER_LABELS,
  SEARCH_LABELS,
} from '../../../constants/service-message-labels.ts'
import type { TCrudEndpointKeys } from '../../../configs/table-key.config.ts'
import Loader from '../Loader/Loader.tsx'

interface Props {
  children: Readonly<React.ReactNode>
  count: number
  page: number
  isFetching: boolean
  isPending: boolean
  isEmptyData: boolean
  isChecked: boolean
  isAllChecked: boolean
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void
  onChangePage: (isIncrement: boolean) => void
  onHandleCreate: () => void
  onDelete: () => void
  toggleAll: () => void
  columns: string[]
  search: string
  tableKey: TCrudEndpointKeys
}

const PageWrapper = ({
  children,
  count,
  isFetching,
  page,
  toggleAll,
  onChangePage,
  isEmptyData,
  isChecked,
  onHandleCreate,
  onDelete,
  isPending,
  columns,
  isAllChecked,
  onSearch,
  search,
  tableKey,
}: Props) => {
  return (
    <>
      <div className={'flex flex-col justify-between h-full gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex justify-between flex-wrap'}>
            <ControlBox
              onAdd={onHandleCreate}
              onDelete={onDelete}
              isPending={isPending}
              isChecked={isChecked}
              tableKey={tableKey}
            />
            <SearchInput
              onChange={onSearch}
              id={`${MANY_UPPER_LABELS[tableKey]} search`}
              labelText={SEARCH_LABELS[tableKey]}
              value={search}
            />
          </div>
          {!isEmptyData && (
            <div className={'relative max-w-fit'}>
              {isFetching && (
                <div
                  className={
                    'absolute inset-0 bg-black/50 flex items-center justify-center z-20'
                  }
                >
                  <Loader />
                </div>
              )}
              <div className={'overflow-x-auto relative'}>
                <table
                  className={'text-left text-nowrap border border-collapse'}
                >
                  <Thead
                    columns={columns}
                    isChecked={!isEmptyData && isAllChecked}
                    onChange={toggleAll}
                  />
                  <tbody className={'divide-y text-sm'}>{children}</tbody>
                </table>
              </div>
            </div>
          )}
          {isEmptyData && <EmptyTable />}
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
    </>
  )
}

export default PageWrapper
