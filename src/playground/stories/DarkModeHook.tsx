import React from 'react'

import { Button, Code, Text, DarkModeIcon, LightModeIcon } from '~'

import { useDarkMode } from '~/hooks/useDarkMode'

export const DarkModeHook = () => {
  const [darkMode, setDarkMode] = useDarkMode()

  const codeExample = `
    import { useDarkMode } from '~/hooks/useDarkMode'

    const [darkMode, setDarkMode] = useDarkMode()

    <Button onClick={() => setDarkMode(!darkMode)} ghost outline>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  `

  return (
    <div>
      <Code value={codeExample} space />
      <Text space="12px">DarkMode: {darkMode ? 'true' : 'false'}</Text>
      <Button onClick={() => setDarkMode(!darkMode)} ghost outline>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </div>
  )
}
