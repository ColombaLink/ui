import ListIcon from './ListIcon'
import {
  DragDropIcon,
  Text,
  Badge,
  Tooltip,
  MoreIcon,
  Button,
  RedoIcon,
  Color,
  ContextItem,
  useDialog,
  useContextMenu,
  Thumbnail,
  AddIcon,
} from '~'
import { styled } from 'inlines'
import React, { CSSProperties, FC } from 'react'
import { border, color, getName } from '~/utils'
import { useClient, useSchema } from '@based/react'

const ListItemStyled = styled('div', {
  borderRadius: 4,
  border: border(1),
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: color('background2dp'),
})

const Box = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

const EditMenu: FC<{
  schemaType: string
  name: string
  fieldName: string
}> = ({ schemaType, name, fieldName }) => {
  const { schema } = useSchema()
  const client = useClient()
  const { confirm } = useDialog()
  return (
    <ContextItem
      // @ts-ignore
      onClick={async () => {
        if (
          await confirm(
            `Are you sure you want to remove the field ${name} from ${getName(
              schema,
              schemaType
            )}?`
          )
        ) {
          await client.removeField(schemaType, fieldName)
        }
      }}
    >
      Delete
    </ContextItem>
  )
}

const ListItem: FC<{
  style: CSSProperties
  type: string
  fieldName: string
  isBidirectional?: boolean
  name: string
  isDragging?: boolean
  schemaType?: string
}> = ({
  style,
  name,
  fieldName,
  type,
  isBidirectional,
  isDragging,
  schemaType,
}) => {
  const openEditMenu = useContextMenu(
    EditMenu,
    {
      schemaType,
      name,
      fieldName,
    },
    { position: 'left' }
  )

  // isBidirectional
  return (
    <ListItemStyled style={style}>
      <Box>
        <DragDropIcon
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            marginRight: 12,
            flexShrink: 0,
          }}
        />
        <Box
          onPointerDown={(e) => {
            // disable drag
            e.stopPropagation()
          }}
        >
          <Thumbnail icon={AddIcon} color="lightgrey" size={32} />
          {/* <ListIcon icon={icon} color={color} /> */}
          {name.length > 20 ? (
            <Tooltip label={name}>
              <Text
                // color="Primary"
                style={{ marginLeft: 16, maxWidth: 150, marginRight: 6 }}
                // weight={'bold'}
              >
                {name}
              </Text>
            </Tooltip>
          ) : (
            <Text
              // color="Primary"
              style={{ marginLeft: 16, maxWidth: 150, marginRight: 6 }}
              // weight={'bold'}
            >
              {name}
            </Text>
          )}
          {/* TODO: bug time */}
          <Text
            style={{ maxWidth: 150 }}
            color="text2"
            // singleLine

            // size={'medium'}
            // weight="regular"
            // color="Secondary"
          >
            - {fieldName}
          </Text>
          <Badge ghost outline style={{ marginLeft: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>{type}</div>
              {isBidirectional ? <RedoIcon style={{ marginLeft: 8 }} /> : ''}
            </div>
          </Badge>
        </Box>
      </Box>
      <Box
        onPointerDown={(e) => {
          // disable drag
          e.stopPropagation()
        }}
      >
        {/* {type === "object" || type === "array" ? (
          <Button style={{ marginRight: 16 }} variant="ghost">
            Settings
          </Button>
        ) : null} */}
        <Button
          onClick={() => {
            console.log('settings!')
          }}
          style={{ marginRight: 16 }}
          ghost
        >
          Settings
        </Button>
        <MoreIcon style={{ flexShrink: 0 }} onClick={openEditMenu} />
      </Box>
    </ListItemStyled>
  )
}

export default ListItem
