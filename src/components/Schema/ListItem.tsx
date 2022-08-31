import React from 'react'
import { Thumbnail, Text, Badge } from '~'

export const ListItem = () => {
  return (
    <div>
      <Thumbnail label="Zulu" color="green" size={32} />
      <Text style={{ marginLeft: 16 }}>Name</Text>
      <Text weight={400} color="text2">
        name
      </Text>
      <Badge style={{ marginLeft: 16 }}>string</Badge>
    </div>
  )
}
