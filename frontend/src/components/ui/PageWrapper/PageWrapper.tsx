import PageChanger from '../PageChanger/PageChanger.tsx'
import ControlBox from '../ControlBox/ControlBox.tsx'
import Thead from '../Thead/Thead.tsx'
import EmptyTable from '../EmptyTable/EmptyTable.tsx'

interface Props {
  children: Readonly<React.ReactNode>
  count: number
  page: number
  isFetching: boolean
  isPending: boolean
  onChangePage: (isIncrement: boolean) => void
  isEmptyData: boolean
  isChecked: boolean
  isAllChecked: boolean
  onHandleCreate: () => void
  onDelete: () => void
  addLabel: string
  deleteLabel: string
  title: string
  columns: string[]
  toggleAll: () => void
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
  title,
  deleteLabel,
  addLabel,
  columns,
  isAllChecked,
}: Props) => {
  return (
    <div className={'flex flex-col p-4 justify-between h-full gap-2'}>
      <div className={'flex flex-col gap-2'}>
        <ControlBox
          title={title}
          onAdd={onHandleCreate}
          onDelete={onDelete}
          isPending={isPending}
          isChecked={isChecked}
          addLabel={addLabel}
          deleteLabel={deleteLabel}
        />
        {!isEmptyData && (
          <div className={'overflow-x-auto'}>
            <table className={'text-left text-nowrap border border-collapse'}>
              <Thead
                columns={columns}
                isChecked={!isEmptyData && isAllChecked}
                onChange={toggleAll}
              />
              <tbody className={'divide-y text-sm'}>{children}</tbody>
            </table>
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
  )
}

export default PageWrapper
