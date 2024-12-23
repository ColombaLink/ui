
import ComponentViewer from '../ComponentViewer'

export const useDarkMode = () => {
  const codeExample = `import { useDarkMode, Button, LightModeIcon, DarkModeIcon } from '@based/ui'

const [darkMode, setDarkMode] = useDarkMode();

<Button onClick={() => setDarkMode(!darkMode)} ghost outline>
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
</Button>`

  return (
    <ComponentViewer
      title="useDarkMode"
      examples={[
        {
          code: codeExample,
        },
      ]}
    />
  )
}
