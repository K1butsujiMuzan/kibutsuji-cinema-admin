import type { TPageTitle } from '../configs/pages.config.ts'

export const MAIN_TITLE: string = 'Kibutsuji admin'

export const getPageTitle = (page: TPageTitle) => `${page} - ${MAIN_TITLE}`
