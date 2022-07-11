import useLocalStorage, {
  setLocalStorage,
  getLocalStorage,
} from '@based/use-local-storage'
import { useEffect } from 'react'
import { updateTheme } from '~/theme'
import { baseTheme } from '~/theme/baseTheme'
import { darkTheme } from '~/theme/darkTheme'

const KEY = '__based_darkmode'
let localState = false

export const useDarkMode = () => {
  const [state] = useLocalStorage(KEY, localState)

  useEffect(() => {
    if (state !== localState) {
      setDarkMode(state, true)
    }
  }, [localState, state])

  return [state, setDarkMode]
}

export const getDarkMode = () => getLocalStorage(KEY)

export const setDarkMode = (val, noLocalStorage = false) => {
  if (!noLocalStorage) {
    setLocalStorage(KEY, val)
  }
  localState = val
  updateTheme(val ? darkTheme : baseTheme)
}
