import React from 'react'
import { Thumbnail, Text, Badge } from '~'

export const ListItem = ({ name }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Thumbnail label="A" color="green" size={32} />
      <Text style={{ marginLeft: 16 }}>{name}</Text>
      <Text style={{ marginLeft: 8 }} weight={400} color="text2">
        name
      </Text>
      <Badge style={{ marginLeft: 16 }}>string</Badge>
    </div>
  )
}
