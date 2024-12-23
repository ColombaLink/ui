
import { Text, Button, Input, Container as ContainerComponent } from '~'
import ComponentViewer from '../ComponentViewer'
import { MoreIcon } from '~/icons'

export const Container = () => {
  return (
    <ComponentViewer
      component={ContainerComponent}
      propsName="ContainerProps"
      examples={[
        {
          props: {
            children: (
              <Input
                label="Put some"
                description="For your example purposes."
                type="text"
              />
            ),
            topLeft: (
              <Text size="18px" weight={600}>
                Container
              </Text>
            ),
            bottomRight: <Button color="text">Save</Button>,
          },
        },
        {
          props: {
            topLeft: (
              <Text size="18px" weight={600}>
                Snurkie
              </Text>
            ),
            topRight: <MoreIcon />,
            children: <Input type="text" label="yes yes" />,
          },
        },
      ]}
    />
  )
}
