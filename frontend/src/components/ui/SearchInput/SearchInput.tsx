import type { ChangeEvent } from 'react'

interface Props {
  labelText: string
  id: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const SearchInput = ({ labelText, id, onChange, value }: Props) => {
  return (
    <div className={'flex items-center gap-2 text-18 w-full max-w-75'}>
      <label htmlFor={id} className={'visually-hidden'}>
        {`Search by ${labelText}`}
      </label>
      <input
        onChange={onChange}
        value={value}
        type={'search'}
        className={
          'outline-none py-1 px-0.5 border-b-2 border-current focus:border-pink-400 transition-[border] duration-300 w-full'
        }
        id={id}
        placeholder={labelText}
      />
    </div>
  )
}

export default SearchInput
