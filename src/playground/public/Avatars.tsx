import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Text, BasedIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Avatars = () => {
  return (
    <>
      <ComponentViewer component={Avatar} />

      <Avatar space size={32} color="Teal" />
      <Avatar space size={40} icon={BasedIcon} color="Red" />
      <Avatar space size={64} color="Orange">
        <Text size="18px" color="Red">
          AB
        </Text>
      </Avatar>
      <Avatar icon={BasedIcon} color="Purple" space />
      <Avatar
        space
        size={64}
        backgroundColor="Red"
        backgroundImg="https://robohash.org/JBS.png?set=set2&size=150x150"
      />
    </>
  )
}
