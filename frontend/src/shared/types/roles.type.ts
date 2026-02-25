export type TRole = (typeof ROLES)[number]

export const ROLES = ['USER', 'MODERATOR', 'ADMIN'] as const
