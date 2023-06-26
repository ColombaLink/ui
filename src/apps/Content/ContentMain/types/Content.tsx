import React, { FC } from 'react'
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
import { ContentConfig, View } from '../../types'

export const Content: FC<{ view: View<ContentConfig>; actions }> = ({
  view,
  actions,
}) => {
  const openContextMenu = useContextMenu<{ view }>(actions, { view })
  const [state, setState] = useLocalStorage('view-' + view, {})
  const [, setView] = useContextState<any>('view')
  const [, setOverlay] = useContextState<any>('overlay')
  const [target, setTarget] = useContextState<any>('target')
  const [, setOverlayTarget] = useContextState<any>('overlay-target')
  const isTable = view.config.view === 'table'
  const targetDefaults = view.config?.target ?? {}
  const client = useClient()
  const ctx = {
    data: {},
    state,
    client,
    target: { ...targetDefaults, ...target },
    args: [],
    setOverlay,
    setState,
    setView,
    setTarget: (t, isOverlay = false) => {
      if (isOverlay) {
        setOverlayTarget(t)
      } else {
        setTarget(t)
      }
    },
  }

  const { data } = useQuery(
    view.config.function?.name,
    parseProps(view.config.function?.payload, ctx)
  )

  ctx.data = data

  const props = parseProps(view.config.props ?? {}, ctx)

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
          paddingTop: 24,
          paddingBottom: 32,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row
          style={{
            justifyContent: 'space-between',
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <Row>
            <Text typography="subtitle500">{props.name ?? view.name}</Text>
            <Button
              style={{ marginLeft: 16 }}
              ghost
              onClick={openContextMenu}
              icon={MoreIcon}
            />
          </Row>
          {props.button ? <Button {...props.button} /> : null}
        </Row>

        <styled.div style={{ width: '100%', height: '100%', padding: 24 }}>
          {isTable && <Table {...props} />}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
