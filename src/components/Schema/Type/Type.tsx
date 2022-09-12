import React, { FC } from 'react'
import { styled } from 'inlines'
import {
  Text,
  ScrollArea,
  MoreIcon,
  useContextMenu,
  ContextItem,
  ContextDivider,
  useDialog,
} from '~'
import { List } from './List'
import { getName } from '~/utils'
import { useClient, useSchema } from '@based/react'

const Container = styled(ScrollArea, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: 32,
  paddingRight: 32,
  paddingTop: 16 + 2,
  paddingBottom: 64,
})

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const EditMenu: FC<{ type: string }> = ({ type }) => {
  const { schema } = useSchema()
  const client = useClient()
  const { confirm } = useDialog()

  return (
    <ContextItem
      // @ts-ignore
      onClick={async () => {
        if (
          await confirm(
            `Are you sure you want to remove ${getName(schema, type)}?`
          )
        ) {
          await client.removeType(type)
          // setLocation(`/dashboard/${schema.id}/schema`)
        }
      }}
    >
      Delete
    </ContextItem>
  )
}

export const Type: FC<{
  hrefPrefix: string
  type: string
  db: string
}> = ({ type, db }) => {
  const { schema, loading } = useSchema()
  const openEditMenu = useContextMenu(
    EditMenu,
    {
      schema,
      type,
    },
    { position: 'right' }
  )

  if (loading) return null

  const { meta = {}, fields } =
    type === 'root' ? schema.rootType : schema.types[type]
  const { name, description } = meta

  return (
    <Container>
      <div>
        <Header
          style={{
            justifyContent: 'space-between',
          }}
        >
          <Header>
            <Text
              size="18px"
              weight="700"
              style={{
                userSelect: 'none',
                textTransform: 'capitalize',
              }}
            >
              {name || type}
            </Text>
            <MoreIcon style={{ marginLeft: 16 }} onClick={openEditMenu} />
          </Header>
        </Header>
        {description ? (
          <Text color="text2" italic>
            {description}
          </Text>
        ) : null}
      </div>
      <List fields={fields} type={type} db={db} />
    </Container>
  )
}
