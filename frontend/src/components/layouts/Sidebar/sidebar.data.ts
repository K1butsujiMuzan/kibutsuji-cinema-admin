import type { FC, SVGProps } from 'react'
import { PAGES } from '../../../configs/pages.config.ts'
import {
  SidebarAccountIcon,
  SidebarAgeIcon,
  SidebarAnimeIcon,
  SidebarEpisodeIcon,
  SidebarGenreIcon,
  SidebarMainIcon,
  SidebarSessionIcon,
  SidebarStatusIcon,
  SidebarTypeIcon,
  SidebarUserIcon,
  SidebarVerificationIcon,
} from './SidebarIcons.tsx'

interface ISidebar {
  href: string
  name: string
  icon: FC<SVGProps<SVGSVGElement>>
}

export const sidebar: ISidebar[] = [
  {
    href: PAGES.DASHBOARD,
    name: 'Main',
    icon: SidebarMainIcon,
  },
  {
    href: PAGES.ACCOUNTS,
    name: 'Accounts',
    icon: SidebarAccountIcon,
  },
  {
    href: PAGES.AGE_LIMITS,
    name: 'Age limits',
    icon: SidebarAgeIcon,
  },
  {
    href: PAGES.ANIME,
    name: 'Anime',
    icon: SidebarAnimeIcon,
  },
  {
    href: PAGES.EPISODES,
    name: 'Episodes',
    icon: SidebarEpisodeIcon,
  },
  {
    href: PAGES.GENRES,
    name: 'Genres',
    icon: SidebarGenreIcon,
  },
  {
    href: PAGES.SESSIONS,
    name: 'Sessions',
    icon: SidebarSessionIcon,
  },
  {
    href: PAGES.STATUSES,
    name: 'Statuses',
    icon: SidebarStatusIcon,
  },
  {
    href: PAGES.TYPES,
    name: 'Types',
    icon: SidebarTypeIcon,
  },
  {
    href: PAGES.USERS,
    name: 'Users',
    icon: SidebarUserIcon,
  },
  {
    href: PAGES.VERIFICATIONS,
    name: 'Verifications',
    icon: SidebarVerificationIcon,
  },
]
