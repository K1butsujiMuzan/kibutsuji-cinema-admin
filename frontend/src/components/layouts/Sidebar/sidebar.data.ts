import type { FC, SVGProps } from 'react'
import { PAGES } from '../../../configs/pages.config.ts'
import {
  SidebarAnimeIcon,
  SidebarCommentIcon,
  SidebarEpisodeIcon,
  SidebarGenreIcon,
  SidebarLikeIcon,
  SidebarListIcon,
  SidebarMainIcon,
  SidebarRatingIcon,
  SidebarSubscriptionIcon,
  SidebarTransactionIcon,
  SidebarUserIcon,
} from './SidebarIcons.tsx'
import { MANY_UPPER_LABELS } from '../../../constants/service-message-labels.ts'

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
    href: PAGES.ANIME,
    name: MANY_UPPER_LABELS.ANIME,
    icon: SidebarAnimeIcon,
  },
  {
    href: PAGES.COMMENTS,
    name: MANY_UPPER_LABELS.COMMENTS,
    icon: SidebarCommentIcon,
  },
  {
    href: PAGES.EPISODES,
    name: MANY_UPPER_LABELS.EPISODES,
    icon: SidebarEpisodeIcon,
  },
  {
    href: PAGES.GENRES,
    name: MANY_UPPER_LABELS.GENRES,
    icon: SidebarGenreIcon,
  },
  {
    href: PAGES.LISTS,
    name: MANY_UPPER_LABELS.LISTS,
    icon: SidebarListIcon,
  },
  {
    href: PAGES.LIKES,
    name: MANY_UPPER_LABELS.LIKES,
    icon: SidebarLikeIcon,
  },
  {
    href: PAGES.RATINGS,
    name: MANY_UPPER_LABELS.RATINGS,
    icon: SidebarRatingIcon,
  },
  {
    href: PAGES.SUBSCRIPTIONS,
    name: MANY_UPPER_LABELS.SUBSCRIPTIONS,
    icon: SidebarSubscriptionIcon,
  },
  {
    href: PAGES.TRANSACTIONS,
    name: MANY_UPPER_LABELS.TRANSACTIONS,
    icon: SidebarTransactionIcon,
  },
  {
    href: PAGES.USERS,
    name: MANY_UPPER_LABELS.USERS,
    icon: SidebarUserIcon,
  },
]
