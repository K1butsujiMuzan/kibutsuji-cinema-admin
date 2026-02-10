interface Props {
  label: string
  onClick: () => void
}

const EditButton = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label={`edit ${label}`}
      title={`edit ${label}`}
      type="button"
      className={
        'w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 transition duration-300'
      }
    >
      <svg
        role={'img'}
        aria-hidden={true}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2831_1338)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.8983 1.25229C13.1172 0.471243 11.8509 0.47124 11.0698 1.25229L1.63146 10.6907C1.35226 10.9699 1.16195 11.3255 1.08452 11.7126L0.693138 13.6696C0.506546 14.6025 1.3291 15.4251 2.26206 15.2385L4.21896 14.8471C4.60614 14.7697 4.96174 14.5794 5.24094 14.3002L14.6793 4.86176C15.4604 4.08072 15.4604 2.81439 14.6793 2.03334L13.8983 1.25229ZM12.0126 2.1951C12.273 1.93475 12.6951 1.93475 12.9555 2.1951L13.7365 2.97615C13.9969 3.2365 13.9969 3.6586 13.7365 3.91896L11.9554 5.70002L10.2316 3.97616L12.0126 2.1951ZM9.28877 4.91897L2.57427 11.6335C2.4812 11.7266 2.41777 11.8451 2.39196 11.9742L2.00058 13.931L3.95747 13.5396C4.08653 13.5138 4.20506 13.4504 4.29813 13.3574L11.0126 6.64282L9.28877 4.91897Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2831_1338">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default EditButton
