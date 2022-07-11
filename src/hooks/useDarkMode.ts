import useLocalStorage, {
  setLocalStorage,
  getLocalStorage,
} from '@based/use-local-storage'
import { useEffect } from 'react'
import { updateTheme } from '~/theme'
import { baseTheme } from '~/theme/baseTheme'
import { darkTheme } from '~/theme/darkTheme'

const KEY = '__based_darkmode'
let isLocalDarkMode = false
export const useDarkMode = () => {
  const [state] = useLocalStorage(KEY, isLocalDarkMode)

  useEffect(() => {
    if (state !== isLocalDarkMode) {
      setDarkMode(state, true)
    }
  }, [isLocalDarkMode, state])

  return [state, setDarkMode]
}

export const getDarkMode = () => getLocalStorage(KEY)
export const setDarkMode = (val, noLocalStorage = false) => {
  if (!noLocalStorage) {
    setLocalStorage(KEY, val)
  }
  isLocalDarkMode = val
  updateTheme(val ? darkTheme : baseTheme)
}
