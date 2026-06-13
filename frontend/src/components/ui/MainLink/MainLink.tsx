import { PAGES } from '../../../configs/pages.config.ts'
import { Link } from 'react-router-dom'

const MainLink = () => {
  return (
    <Link
      className={
        'inline p-2.5 rounded-full hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      to={PAGES.DASHBOARD}
      aria-label={'to the main page'}
    >
      <svg
        aria-hidden={true}
        className={'text-pink-300 shrink-0'}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={'text-gray-700 dark:text-gray-100'}
          d="M5.152 16V4.864H7.76V9.184L11.744 4.864H14.816L9.872 10.176L15.072 16H11.776L7.76 11.456V16H5.152Z"
          fill="#BFBFBF"
        />
        <rect
          x="18"
          y="20"
          width="9"
          height="2"
          transform="rotate(-90 18 20)"
          fill="#7E57C2"
        />
        <rect
          x="20"
          y="20"
          width="9"
          height="2"
          transform="rotate(-180 20 20)"
          fill="#7E57C2"
        />
        <rect
          x="2"
          width="9"
          height="2"
          transform="rotate(90 2 0)"
          fill="#7E57C2"
        />
        <rect width="9" height="2" fill="#7E57C2" />
      </svg>
    </Link>
  )
}

export default MainLink
