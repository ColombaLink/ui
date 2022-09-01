import React from 'react'
import {
  Thumbnail,
  Text,
  Badge,
  TextIcon,
  ToggleIcon,
  TwentyThreeIcon,
  PercentageIcon,
  AttachmentIcon,
  EditIcon,
  CalendarIcon,
  CurlyBracesIcon,
  EmailIcon,
  GeoMarkerIcon,
  MarkDownIcon,
  TargetIcon,
  ExternalLinkIcon,
  ReferenceIcon,
  LayersIcon,
  ModelIcon,
  ListIcon,
  LockIcon,
  color,
  Button,
} from '~'

export const ListItem = ({ name, badgeName }) => {
  const iconColorMap = {
    text: [TextIcon, 'lightpurple'],
    url: [ExternalLinkIcon, 'lightgreen'],
    email: [EmailIcon, 'lightgreen'],
    id: [TargetIcon, 'lightyellow'],
    type: [LayersIcon, 'lightred'],
    markdown: [MarkDownIcon, 'lightyellow'],
    richtext: [EditIcon, ''],
    options: [],
    references: [ReferenceIcon, 'lightteal'],
    file: [AttachmentIcon, ''],
    json: [CurlyBracesIcon, ''],
    object: [ModelIcon, ''],
    geo: [GeoMarkerIcon, ''],
    map: [],
    number: [TwentyThreeIcon, 'lightaccent'],
    array: [ListIcon, ''],
    integer: [TwentyThreeIcon, 'accent'],
    float: [PercentageIcon, ''],
    boolean: [ToggleIcon, 'lightaccent'],
    string: [TextIcon, 'lightpurple'],
    set: [ListIcon, 'lightgrey'],
    timestamp: [CalendarIcon, 'lightbabyblue'],
    createdAt: [CalendarIcon, 'lightbabyblue'],
    updatedAt: [CalendarIcon, 'lightbabyblue'],
    parents: [ReferenceIcon, ''],
    children: [ReferenceIcon, ''],
    digest: [LockIcon, 'lightpurple'],
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Thumbnail
        icon={iconColorMap[`${badgeName}`][0]}
        // @ts-ignore
        color={iconColorMap[`${badgeName}`][1]}
        size={32}
      />
      <Text style={{ marginLeft: 16 }}>{name}</Text>
      {/* <Text style={{ marginLeft: 8 }} weight={400} color="text2">
        name
      </Text> */}
      <Badge style={{ marginLeft: 16 }}>{badgeName}</Badge>

      <Button style={{ position: 'absolute', right: 40 }} ghost>
        Settings
      </Button>
    </div>
  )
}
