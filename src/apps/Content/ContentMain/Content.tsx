// make this now
import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
} from '~'

export const Content = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
      }}
    >
      <styled.div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth: '100%',
          paddingTop: 16,
          paddingBottom: 32,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row
          style={{
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <Text typography="subtitle500">{view.name}</Text>
          <Button
            style={{ marginLeft: 16 }}
            ghost
            onClick={contextMenu}
            icon={MoreIcon}
          />
        </Row>
      </styled.div>
    </ScrollArea>
  )
}
