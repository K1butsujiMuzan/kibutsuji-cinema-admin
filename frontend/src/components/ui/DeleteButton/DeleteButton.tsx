interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
}

const DeleteButton = ({ label, onClick, disabled }: Props) => {
  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={`delete selected ${label}`}
      className={
        'aspect-square p-1 md:p-2 rounded-md disabled:cursor-not-allowed! disabled:opacity-70 hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      type="button"
      onClick={onClick}
    >
      <svg
        role={'img'}
        aria-hidden={true}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2811_1349)">
          <path
            d="M14.026 3C14.7912 3 15.4706 3.49577 15.7125 4.23079L16.1963 5.7H19.1111C19.602 5.7 20 6.10295 20 6.6C20 7.09704 19.602 7.49998 19.1111 7.5L19.1089 7.56412L18.3379 18.4923C18.2382 19.9053 17.0771 21 15.678 21H8.32199C6.92295 21 5.76178 19.9053 5.6621 18.4923L4.89115 7.56412C4.88963 7.54261 4.88887 7.52123 4.88885 7.5C4.39795 7.49998 4 7.09704 4 6.6C4 6.10295 4.39797 5.7 4.88889 5.7H7.80377L8.28746 4.23079C8.52944 3.49577 9.2088 3 9.97401 3H14.026ZM17.3311 7.5H6.66893L7.43536 18.3641C7.46859 18.8351 7.85564 19.2 8.32199 19.2H15.678C16.1444 19.2 16.5314 18.8351 16.5646 18.3641L17.3311 7.5ZM10.2222 10.2C10.6781 10.2 11.0538 10.5474 11.1051 10.995L11.1111 11.1V15.6C11.1111 16.0971 10.7132 16.5 10.2222 16.5C9.76636 16.5 9.39066 16.1526 9.33931 15.705L9.33333 15.6V11.1C9.33333 10.6029 9.7313 10.2 10.2222 10.2ZM13.7778 10.2C14.2687 10.2 14.6667 10.6029 14.6667 11.1V15.6C14.6667 16.0971 14.2687 16.5 13.7778 16.5C13.2868 16.5 12.8889 16.0971 12.8889 15.6V11.1C12.8889 10.6029 13.2868 10.2 13.7778 10.2ZM14.026 4.8H9.97401L9.67772 5.7H14.3223L14.026 4.8Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2811_1349">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default DeleteButton
