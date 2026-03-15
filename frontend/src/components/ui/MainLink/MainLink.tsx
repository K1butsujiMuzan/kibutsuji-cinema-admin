import { PAGES } from '../../../configs/pages.config.ts'
import { Link } from 'react-router-dom'

const MainLink = () => {
  return (
    <Link
      className={
        'inline p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      to={PAGES.DASHBOARD}
      aria-label={'to the main page'}
    >
      <svg
        aria-hidden={true}
        className={' text-pink-300 shrink-0'}
        width="24"
        height="24"
        viewBox="0 0 65 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={'text-gray-700 dark:text-gray-100'}
          d="M19.456 49V15.592H27.28V28.552L39.232 15.592H48.448L33.616 31.528L49.216 49H39.328L27.28 35.368V49H19.456Z"
          fill="#BFBFBF"
        />
        <rect
          x="58"
          y="65"
          width="30"
          height="7"
          transform="rotate(-90 58 65)"
          fill="#7E57C2"
        />
        <rect
          x="65"
          y="65"
          width="30"
          height="7"
          transform="rotate(-180 65 65)"
          fill="#7E57C2"
        />
        <rect
          x="7"
          width="30"
          height="7"
          transform="rotate(90 7 0)"
          fill="#7E57C2"
        />
        <rect width="30" height="7" fill="#7E57C2" />
      </svg>
    </Link>
  )
}

export default MainLink
