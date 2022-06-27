import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Provider } from '..'
import { Text } from '..'
import { BasedIcon } from '~'

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
        icon={<BasedIcon color="AccentBrightpurple" />}
        backgroundColor="AccentBrightpurpleLight"
        space
      />

      <Avatar
        space
        size={64}
        backgroundColor="AccentRed"
        backgroundImg="https://robohash.org/JBS.png?set=set2&size=150x150"
      />
    </Provider>
  )
}
