export const ROLES = ['USER', 'MODERATOR', 'ADMIN'] as const

export type TRole = (typeof ROLES)[number]
