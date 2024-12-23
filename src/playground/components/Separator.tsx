
import { Separator as SeparatorComponent } from '~/components/Separator'
import ComponentViewer from '../ComponentViewer'

export const Separator = () => {
  return (
    <ComponentViewer
      component={SeparatorComponent}
      propsName="SeparatorProps"
      examples={[
        {
          props: {},
        },
        {
          props: {
            children: 'or',
          },
        },
        {
          props: {
            children: 'next section',
          },
        },
      ]}
    />
  )
}
