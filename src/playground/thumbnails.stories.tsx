import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { AttachmentIcon, MarkDownIcon, TextIcon } from '~/icons'

export const Thumbnails = () => {
  return (
    <div>
      <Thumbnail size="32px" space="12px">
        <TextIcon size={12} color="AccentPurple" />
      </Thumbnail>
      <Thumbnail size="40px" backgroundColor="AccentYellowLight" space="12px">
        <MarkDownIcon size={20} color="AccentYellow" />
      </Thumbnail>
      <Thumbnail size="40px" backgroundColor="AccentOrangeLight">
        <AttachmentIcon size={20} color="AccentOrange" />
      </Thumbnail>
    </div>
  )
}
