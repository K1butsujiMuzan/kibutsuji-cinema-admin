import { useEffect } from 'react'
import { getPageTitle } from '../constants/page-information.ts'
import type { PAGE_TITLES } from '../configs/pages.config.ts'

export const useTitle = (
  title: (typeof PAGE_TITLES)[keyof typeof PAGE_TITLES],
) => {
  useEffect(() => {
    document.title = getPageTitle(title)
  }, [title])

  return null
}
