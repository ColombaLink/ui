
import { Label as LabelComponent } from '~/components/Label'
import { ErrorIcon } from '~'

import ComponentViewer from '../ComponentViewer'

export const Label = () => {
  return (
    <ComponentViewer
      component={LabelComponent}
      propsName="LabelProps"
      examples={[
        {
          props: {
            label: 'Label',
            description: 'Description',
            children: 'Children',
          },
        },
        {
          props: {
            label: 'Label',
            labelColor: 'accent',
            description: 'Description',
            descriptionColor: 'green',
            icon: <ErrorIcon />,
            iconColor: 'red',
          },
        },
      ]}
    />
  )
}
