import Loader from '../Loader/Loader.tsx'

const PageLoader = () => {
  return (
    <div
      className={'flex flex-col justify-center items-center h-full text-center'}
    >
      <p className={'text-3xl font-medium'}>Loading, please wait</p>
      <Loader className={'mx-auto w-30'} />
    </div>
  )
}

export default PageLoader
