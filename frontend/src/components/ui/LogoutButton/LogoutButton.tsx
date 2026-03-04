import { useNavigate } from 'react-router-dom'
import { PAGES } from '../../../configs/pages.config'
import { memo } from 'react'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate(PAGES.LOGIN)
  }

  return (
    <button
      className={
        'aspect-square p-1 md:p-2 rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      type="button"
      onClick={logout}
      aria-label={'logout'}
    >
      <svg
        aria-hidden={true}
        role={'img'}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2804_1344)">
          <path
            d="M12 3C12.5523 3 13 3.44772 13 4C13 4.51283 12.614 4.93551 12.1166 4.99327L12 5H7C6.48717 5 6.06449 5.38604 6.00673 5.88338L6 6V18C6 18.5128 6.38604 18.9355 6.88338 18.9933L7 19H11.5C12.0523 19 12.5 19.4477 12.5 20C12.5 20.5128 12.114 20.9355 11.6166 20.9933L11.5 21H7C5.40232 21 4.09634 19.7511 4.00509 18.1763L4 18V6C4 4.40232 5.24892 3.09634 6.82373 3.00509L7 3H12ZM17.707 8.46447L20.5355 11.2929C20.926 11.6834 20.926 12.3166 20.5355 12.7071L17.707 15.5355C17.3165 15.9261 16.6834 15.9261 16.2928 15.5355C15.9023 15.145 15.9023 14.5118 16.2928 14.1213L17.4142 13H12C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11H17.4142L16.2928 9.87868C15.9023 9.48816 15.9023 8.85499 16.2928 8.46447C16.6834 8.07394 17.3165 8.07394 17.707 8.46447Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2804_1344">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default memo(LogoutButton)
