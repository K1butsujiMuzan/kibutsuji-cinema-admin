import { useEmail, useRole } from '../../stores/useUserStore.ts'
import { cn } from '../../lib/utils.ts'

const UserWelcome = () => {
  const userEmail = useEmail()
  const userRole = useRole()

  return (
    <div
      className={
        'flex bg-pink-50 dark:bg-gray-750 rounded-xl p-3 gap-2 items-start transition duration-300'
      }
    >
      <div
        className={
          'overflow-hidden text-ellipsis text-nowrap text-2xl font-semibold'
        }
      >
        Hello {userEmail}
      </div>
      <span
        className={cn(
          'lowercase text-xs border-2 px-2 py-0.5 dark:text-white rounded-lg leading-3 font-semibold',
          {
            'bg-pink-200/65 border-pink-200': userRole === 'ADMIN',
            'bg-blue-400/75 border-blue-300': userRole === 'MODERATOR',
          },
        )}
      >
        {userRole}
      </span>
    </div>
  )
}

export default UserWelcome
