import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  useContextState,
  Button,
  MoreIcon,
  Table,
  useDialog,
} from '~'
import { useQuery, useClient } from '@based/react'
import { parseProps } from '../propsParser'
import useLocalStorage from '@based/use-local-storage'

export const Content = ({ view, actions }) => {
  const openContextMenu = useContextMenu<{ view }>(actions, { view })
  const [state, setState] = useLocalStorage('view-' + view, {})
  const [, setView] = useContextState<any>('view')
  const [, setOverlay] = useContextState<any>('overlay')

  const isTable = view.config.view === 'table'

  const { data } = useQuery(
    view.config.function?.name,
    view.config.function?.payload // TODO: parse target erin g
  )

  const client = useClient()

  const props = parseProps(view.config.props ?? {}, {
    data,
    state,
    client,
    args: [],
    setOverlay,
    setState,
    setView,
  })

  console.log('PROPS', view.config.props, props, isTable)

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 200,
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
            onClick={openContextMenu}
            icon={MoreIcon}
          />
        </Row>

        <styled.div style={{ width: '100%', height: '100%', padding: 24 }}>
          {isTable && <Table {...props} />}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
