import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { AttachmentIcon, MarkDownIcon, TextIcon } from '~/icons'

export const Thumbnails = () => {
  return (
    <div>
      <Thumbnail
        size="32px"
        space="12px"
        color="AccentPurple"
        icon={TextIcon({ size: 12 })}
      />
      <Thumbnail space="12px" icon={MarkDownIcon} color="AccentYellow" />
      <Thumbnail color="AccentOrange" icon={AttachmentIcon} space />
      <Thumbnail
        backgroundImg="https://robohash.org/ZCP.png?set=set1&size=150x150"
        backgroundColor="ErrorLightContrast"
        size={64}
      />
    </div>
  )
}
