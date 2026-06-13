interface Props {
  label: string
  onClick: () => void
}

const Report = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type={'button'}
      className={
        'bg-pink-50 dark:bg-gray-750 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 transition duration-300'
      }
    >
      <span
        className={
          'overflow-hidden text-nowrap text-xl font-semibold text-ellipsis'
        }
      >
        {label}
      </span>
      <svg
        role={'img'}
        aria-hidden={true}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8327 7.5V14.8333C15.8327 15.7667 15.8327 16.2335 15.651 16.59C15.4913 16.9036 15.2363 17.1586 14.9227 17.3183C14.5662 17.5 14.0994 17.5 13.166 17.5H6.83268C5.89926 17.5 5.43255 17.5 5.07603 17.3183C4.76242 17.1586 4.50746 16.9036 4.34767 16.59C4.16602 16.2335 4.16602 15.7667 4.16602 14.8333V5.16667C4.16602 4.23324 4.16602 3.76653 4.34767 3.41002C4.50746 3.09641 4.76242 2.84144 5.07603 2.68166C5.43255 2.5 5.89927 2.5 6.83268 2.5H10.8327M15.8327 7.5L10.8327 2.5M15.8327 7.5H11.666C11.2058 7.5 10.8327 7.1269 10.8327 6.66667V2.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default Report
