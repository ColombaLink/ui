import React, { useState } from 'react'
import { Text } from '~/components/Text'
import { CustomList } from '~/components/CustomList'
import { Thumbnail } from '~/components/Thumbnail'
import { Badge } from '~/components/Badge'
import { FileIcon } from '~/icons'

const testingListItems = [
  <>
    <Thumbnail label="Zulu" color="green" size={32} />
    <Text style={{ marginLeft: 16 }}>Zulu</Text>
    <Badge style={{ marginLeft: 16 }}>String</Badge>
  </>,
  <>
    <Thumbnail color="babyblue" label="Y" size={32} />
    <Text style={{ marginLeft: 16 }}>Yak</Text>
    <Badge style={{ marginLeft: 16 }}>File</Badge>
  </>,
  <>
    <Thumbnail label="X" size={32} />
    <Text style={{ marginLeft: 16 }}>Xray</Text>
    <Badge style={{ marginLeft: 16 }}>Text</Badge>
  </>,
  <>
    <Thumbnail icon={FileIcon} color="mustard" size={32} />
    <Text style={{ marginLeft: 16 }}>Whiskey</Text>
    <Badge style={{ marginLeft: 16 }}>Drink</Badge>
  </>,
]

export const Lists = () => {
  return (
    <div style={{ height: 360, width: 640 }}>
      <CustomList
        items={testingListItems}
        draggable
        style={
          {
            /* background: 'orange', width: 500,*/
          }
        }
      />
    </div>
  )
}
