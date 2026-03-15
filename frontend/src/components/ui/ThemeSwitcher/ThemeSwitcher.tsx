import { toggleTheme, useIsDark } from '../../../stores/useThemeStore.ts'
import { DarkIcon, LightIcon } from './ThemeIcons.tsx'
import { memo } from 'react'

const ThemeSwitcher = () => {
  const isDark = useIsDark()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={
        'aspect-square p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      aria-label={`Current theme: ${isDark ? 'dark' : 'light'}. Click to change theme`}
    >
      {isDark ? <DarkIcon /> : <LightIcon />}
    </button>
  )
}

export default memo(ThemeSwitcher)
