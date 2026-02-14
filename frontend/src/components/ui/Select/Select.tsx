import type { SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  values: string[]
  id: string
}

const Select = ({ values, id, ...props }: Props) => {
  return (
    <div className={'relative'}>
      <select
        id={id}
        className={
          'border-2 rounded-md border-pink-400 appearance-none cursor-pointer pl-2 pr-9 h-9 peer'
        }
        {...props}
      >
        {values.map((item) => (
          <option
            key={item}
            className={'bg-gray-50 dark:bg-gray-950 cursor-pointer'}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
      <svg
        className={
          'absolute right-[5%] top-[calc(50%-0.5rem)] peer-open:rotate-180 transition duration-300 pointer-events-none'
        }
        role={'img'}
        aria-hidden={true}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 4.71211L14.8757 3.60039L7.98951 10.2094L7.25504 9.50469L7.25908 9.5082L1.14124 3.63594L-2.38419e-07 4.73164C1.69088 6.35466 6.41162 10.8858 7.98951 12.4004C9.16223 11.2755 8.01937 12.3725 16 4.71211Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default Select
