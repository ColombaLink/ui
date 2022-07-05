import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon } from '~'

export const Thumbnails = () => {
  return (
    <>
      <Thumbnail
        size="32px"
        space="12px"
        color="BlueBaby"
        icon={TextIcon({ size: 12 })}
      />
      <Thumbnail space="12px" icon={MarkDownIcon} color="Pink" />
      <Thumbnail icon={AttachmentIcon} space color="Purple" />
      <Thumbnail
        backgroundImg="https://robohash.org/ZCP.png?set=set1&size=150x150"
        size={64}
        color="Mustard"
      />
    </>
  )
}
