import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Thumbnails = () => {
  return (
    <>
      <ComponentViewer component={Thumbnail} />
      <Thumbnail
        size={32}
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
