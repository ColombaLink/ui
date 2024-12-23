
import { Steps as StepC } from '~/components/Steps'
import ComponentViewer from '../ComponentViewer'

export const Steps = () => {
  return (
    <ComponentViewer
      component={StepC}
      propsName="StepsProps"
      examples={[
        {
          code: `import { Steps, useRoute } from '@based/ui'

const route = useRoute('[step]', { step: 'schema' });

<Steps 
  active={route.path.step} 
  onChange={(step) => route.setPath({ step })} 
  data={{
    schema: 'Set up your schema',
    content: 'Create content',
    api: 'Make your API accessible',
    integrate: 'Integrate your content with your front-end'
  }}
/>`,
        },
      ]}
    />
  )
}
