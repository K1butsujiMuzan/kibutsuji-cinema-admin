import Loader from '../../components/ui/Loader/Loader.tsx'

const QuantityLoader = () => {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'}>
      {[...Array(4)].map((_, index) => (
        <div
          className={
            'bg-pink-50 dark:bg-gray-750 rounded-xl p-3 overflow-hidden text-nowrap text-ellipsis text-xl font-semibold'
          }
          key={index}
        >
          <div className={'flex items-center gap-2'}>
            Loading
            <Loader className={'w-6'} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuantityLoader
