import React from 'react'
import { Container } from '~'
import { Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const Containers = () => {
  return (
    <>
      <ComponentViewer component={Container} />
      <Container>
        <Text size="18px">A Container</Text>
      </Container>
    </>
  )
}
