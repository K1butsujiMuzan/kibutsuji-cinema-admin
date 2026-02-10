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
  SidebarUserIcon,
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
    href: PAGES.RATINGS,
    name: 'Ratings',
    icon: SidebarRatingIcon,
  },
  {
    href: PAGES.LIKES,
    name: 'Likes',
    icon: SidebarLikeIcon,
  },
  {
    href: PAGES.COMMENTS,
    name: 'Comments',
    icon: SidebarCommentIcon,
  },
  {
    href: PAGES.LISTS,
    name: 'Lists',
    icon: SidebarListIcon,
  },
  {
    href: PAGES.USERS,
    name: 'Users',
    icon: SidebarUserIcon,
  },
]
