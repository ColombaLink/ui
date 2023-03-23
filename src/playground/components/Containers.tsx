import React from 'react'
import { Text, Button, Input, Container } from '~'
import ComponentViewer from '../ComponentViewer'
import { MoreIcon } from '~/icons'

export const Containers = () => {
  return (
    <ComponentViewer
      component={Container}
      propsName="ContainerProps"
      examples={[
        {
          props: {
            children: (
              <Input
                label="Put some"
                description="For your example purposes."
              />
            ),
            topLeft: (
              <Text size="18px" weight={600}>
                Container
              </Text>
            ),
            bottomRight: <Button color="lightgrey">Save</Button>,
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
            children: <Input label="yes yes" />,
          },
        },
      ]}
    />
  )
}