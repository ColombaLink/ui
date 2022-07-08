import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Text, BasedIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Avatars = () => {
  return (
    <>
      <ComponentViewer component={Avatar} />

      <Avatar space size={32} color="Teal" label="Blah" />
      <Avatar space size={40} color="GreenForest" label="Yo" />
      <Avatar space size={40} icon={BasedIcon} color="Red" />
      <Avatar space size={64} color="Orange" label="Hello"></Avatar>
      <Avatar icon={BasedIcon} color="Purple" space />
      <Avatar
        space
        size={64}
        label="Hello"
        backgroundColor="Red"
        backgroundImg="https://robohash.org/JBS.png?set=set2&size=150x150"
      />
    </>
  )
}
