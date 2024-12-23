
import { Spacer as Sp } from '~/components/Spacer'
import ComponentViewer from '../ComponentViewer'

export const Spacer = () => {
  return (
    <ComponentViewer
      component={Sp}
      propsName="SpacerProps"
      examples={[
        {
          props: {
            style: {
              backgroundColor: 'yellow',
              border: '1px solid red',
              marginBottom: 36,
            },
          },
        },
        {
          props: {
            style: { marginBottom: 12 },
          },
        },
      ]}
    />
  )
}
