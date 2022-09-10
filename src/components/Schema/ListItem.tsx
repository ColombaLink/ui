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
  MoreIcon,
  color,
  Button,
  DeleteIcon,
  BasedIcon,
} from '~'
import { styled } from 'inlines'
import { useContextMenu } from '~/hooks'
import { ContextItem } from '~'

export const ListItem = ({
  name,
  fieldName,
  schema,
  client,
  badgeName,

  onDelete,
  isSystemField,
}) => {
  const iconColorMap = {
    text: [TextIcon, 'lightpurple'],
    url: [ExternalLinkIcon, 'lightgreen'],
    email: [EmailIcon, 'lightgreen'],
    id: [TargetIcon, 'lightyellow'],
    type: [LayersIcon, 'lightred'],
    markdown: [MarkDownIcon, 'lightyellow'],
    richtext: [EditIcon, 'lightred'],
    options: [BasedIcon, 'accent'],
    reference: [ReferenceIcon, 'lightteal'],
    references: [ReferenceIcon, 'lightteal'],
    file: [AttachmentIcon, 'lightred'],
    json: [CurlyBracesIcon, 'lightred'],
    object: [ModelIcon, 'lightred'],
    geo: [GeoMarkerIcon, 'lightred'],
    map: [BasedIcon, 'accent'],
    number: [TwentyThreeIcon, 'lightaccent'],
    array: [ListIcon, 'lightred'],
    integer: [TwentyThreeIcon, 'accent'],
    float: [PercentageIcon, 'accent'],
    boolean: [ToggleIcon, 'lightaccent'],
    string: [TextIcon, 'lightpurple'],
    set: [ListIcon, 'lightred'],
    timestamp: [CalendarIcon, 'lightbabyblue'],
    createdAt: [CalendarIcon, 'lightbabyblue'],
    updatedAt: [CalendarIcon, 'lightbabyblue'],
    parents: [ReferenceIcon, 'lightred'],
    children: [ReferenceIcon, 'lightred'],
    digest: [LockIcon, 'lightpurple'],
  }

  const More = styled(MoreIcon, {
    marginRight: 16,
    marginLeft: 'auto',
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
    position: 'absolute',
    right: 0,
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: isSystemField ? 0.5 : 1,
      }}
    >
      <Thumbnail
        icon={badgeName ? iconColorMap[`${badgeName}`][0] : ''}
        // @ts-ignore
        color={badgeName ? iconColorMap[`${badgeName}`][1] : ''}
        size={32}
      />
      <Text style={{ marginLeft: 16 }} weight={600}>
        {fieldName[0].toUpperCase() + fieldName.substring(1)}
      </Text>
      <Badge style={{ marginLeft: 16, color: color('text2') }} color="border">
        {badgeName}
      </Badge>

      <Button style={{ position: 'absolute', right: 40 }} ghost>
        Settings
      </Button>

      <More
        onClick={useContextMenu(
          () => (
            <SimpleMenu
              onDelete={onDelete}
              schema={schema}
              client={client}
              fieldName={fieldName}
              name={name}
            />
          ),
          {},
          { placement: 'center' }
        )}
      />
    </div>
  )
}

const SimpleMenu = ({ onDelete, schema, client, fieldName, name }) => {
  return (
    <>
      {onDelete && (
        <ContextItem
          icon={DeleteIcon}
          onClick={async (e) => {
            // console.log('schema.schema', schema.schema)
            // console.log('ok envClient', client)
            // console.log('name ->', name)
            // console.log('FieldName??? ->', fieldName)

            if (
              await confirm(
                `Are you sure you want to remove the field ${fieldName} from ${name}?`
              )
            ) {
              await client.removeField(name, fieldName)
            }
          }}
        >
          Delete
        </ContextItem>
      )}
    </>
  )
}
