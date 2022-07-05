import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Text, BasedIcon } from '~'

export const Avatars = () => {
  return (
    <>
      <Avatar space size="32px" color="Teal" />
      <Avatar space size="40px" icon={BasedIcon} color="Red" />
      <Avatar space size="64px" color="Orange">
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
