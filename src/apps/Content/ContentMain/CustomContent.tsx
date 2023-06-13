import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  useContextState,
} from '~'
import { useQuery } from '@based/react'

export const CustomContent = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })

  console.log('Custom content view', view)

  //   const [view] = useContextState<string>('view')

  // View Table
  const isTable = view.config.view === 'table'

  // Function -- name, type , payload
  const functionName = view.config.function.name
  const functionType = view.config.function.type
  const functionPayload = view.config.function.payload

  console.log('idee? 💡', functionPayload.$id)

  const { data, loading } = useQuery(
    functionName ? 'db' : undefined,
    functionPayload
  )

  console.log('DATA 💊', data)

  // Props

  // Fields

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 100,
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

        <styled.div style={{ width: '100%', padding: 24 }}>
          {isTable && (
            <Text>is a table</Text>
            // <Table
            //   headers={tableHeader}
            //   data={[data]}
            //   onClick={tableClickHandler}
            //   height={400}
            // />
          )}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
