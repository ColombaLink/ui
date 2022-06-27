import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Provider } from '..'
import { Text } from '..'

export const Avatars = () => {
  return (
    <Provider>
      <Avatar space size="32px" backgroundColor="AccentTeal" />
      <Avatar space size="40px" />
      <Avatar space size="64px">
        <Text size="18px" color="Background0dp">
          AB
        </Text>
      </Avatar>

      <Avatar
        space
        size={64}
        backgroundImg="https://images.unsplash.com/photo-1656306431834-20de73164135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      />
    </Provider>
  )
}
