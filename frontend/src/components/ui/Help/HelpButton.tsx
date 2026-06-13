import { memo, useCallback, useState } from 'react'
import CreateModal from '../CreateModal/CreateModal.tsx'
import { HELP_DATA } from './help.data.ts'

const HelpButton = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false)

  const onHelpModalClose = useCallback(() => {
    setIsHelpModalOpen(false)
  }, [])

  const onHelpModalOpen = useCallback(() => {
    setIsHelpModalOpen(true)
  }, [])

  return (
    <>
      <button
        onClick={onHelpModalOpen}
        className={
          'aspect-square p-2.5 rounded-full hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
        }
        aria-label={'help'}
        type="button"
      >
        <svg
          aria-hidden={true}
          role={'img'}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2923_1341)">
            <path
              d="M19.1666 10C19.1666 15.0626 15.0625 19.1667 9.99992 19.1667C4.93731 19.1667 0.833252 15.0626 0.833252 10C0.833252 4.93743 4.93731 0.833374 9.99992 0.833374C15.0625 0.833374 19.1666 4.93743 19.1666 10ZM2.50561 10C2.50561 14.139 5.86093 17.4944 9.99992 17.4944C14.1389 17.4944 17.4943 14.139 17.4943 10C17.4943 5.86105 14.1389 2.50573 9.99992 2.50573C5.86093 2.50573 2.50561 5.86105 2.50561 10Z"
              fill="#0F0F0F"
            />
            <path
              d="M11.25 15C11.25 15.6903 10.6903 16.25 10 16.25C9.30967 16.25 8.75 15.6903 8.75 15C8.75 14.3097 9.30967 13.75 10 13.75C10.6903 13.75 11.25 14.3097 11.25 15Z"
              fill="#0F0F0F"
            />
            <path
              d="M9.16659 10V11.6667C9.16659 11.6667 9.16659 12.5 9.99992 12.5C10.8333 12.5 10.8333 11.6667 10.8333 11.6667V10C10.8333 10 11.2326 9.88579 11.3857 9.82362C11.3857 9.82362 11.664 9.72429 11.8588 9.57471C12.0538 9.42521 12.23 9.24754 12.3878 9.04196C12.5548 8.83629 12.6847 8.59796 12.7774 8.32688C12.8702 8.05582 12.9166 7.83654 12.9166 7.50004C12.9166 6.93922 12.7913 6.364 12.5408 5.94337C12.2996 5.51341 11.9563 5.18159 11.5109 4.94792C11.0656 4.70489 10.546 4.58337 9.95217 4.58337C9.58109 4.58337 9.25167 4.63011 8.96409 4.72358C8.67642 4.80771 8.42134 4.92454 8.19862 5.0741C7.98522 5.21431 7.8043 5.37321 7.65585 5.5508C7.51668 5.71905 7.40534 5.88262 7.32183 6.04152C7.23833 6.20042 7.18266 6.34062 7.15483 6.46214C7.09916 6.63973 7.07596 6.78462 7.08524 6.89678C7.1038 7.00895 7.15946 7.10242 7.25225 7.17719C7.34503 7.25197 7.48884 7.33142 7.68368 7.41554C7.88781 7.48097 8.04553 7.50434 8.15687 7.48565C8.27749 7.46695 8.37492 7.41087 8.44917 7.3174C8.44917 7.3174 8.84476 6.75478 8.95609 6.64262C9.07676 6.52111 9.22517 6.42764 9.40151 6.36221C9.57776 6.28743 9.77726 6.25004 9.99992 6.25004C10.4824 6.25004 10.8396 6.36688 11.0716 6.60056C11.3128 6.82489 11.3857 7.01362 11.3857 7.44358C11.3857 7.73334 11.3347 7.96702 11.2326 8.14462C11.1305 8.32221 10.996 8.46712 10.829 8.57929C10.829 8.57929 10.6022 8.66596 10.4166 8.75004C10.2403 8.82479 9.91667 8.94846 9.74967 9.04196C9.59192 9.12604 9.50351 9.21446 9.40151 9.34537C9.29942 9.47621 9.16659 9.77571 9.16659 10Z"
              fill="#0F0F0F"
            />
          </g>
          <defs>
            <clipPath id="clip0_2923_1341">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      {isHelpModalOpen && (
        <CreateModal
          className={'max-w-250'}
          id={'help-modal'}
          label={'Help - Kibutsuji admin'}
          closeModal={onHelpModalClose}
        >
          <div className={'w-full flex flex-col gap-3 mt-4'}>
            {HELP_DATA.map((item) => (
              <div className={'flex flex-col gap-2'} key={item.title}>
                <h3 className={'text-xl md:text-2xl font-medium'}>
                  {item.title}
                </h3>
                {item.list && (
                  <ul className={'list-disc ml-5 md:ml-10 flex flex-col gap-1'}>
                    {item.list.map((listItem, index) => (
                      <li
                        className={'text-sm md:text-base'}
                        key={`${item.title.toLowerCase().split(' ').join('-')}-${index}`}
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}
                {item.paragraph && (
                  <p className={'text-sm md:text-base'}>{item.paragraph}</p>
                )}
              </div>
            ))}
          </div>
        </CreateModal>
      )}
    </>
  )
}

export default memo(HelpButton)
