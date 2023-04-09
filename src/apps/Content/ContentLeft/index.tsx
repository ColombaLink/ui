import React, { FC, useState } from 'react'
import {
  border,
  LoadingIcon,
  Menu,
  Text,
  Badge,
  useContextState,
  AddIcon,
  Button,
  useDialog,
  RowSpaced,
} from '~'
import { View } from '../types'
import { useViews } from '../hooks/useViews'
import { EditJsonModal } from '../EditJson'
import { useClient } from '@based/react'
import { AddCustomViewModal } from '../AddCustomViewModal'

export const SystemLabel = ({ isActive = false, children }) => {
  const [hover, setHover] = useState(false)
  let thingy: boolean
  if (hover || isActive) {
    thingy = false
  } else {
    thingy = true
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
      <Badge ghost={thingy}>system</Badge>
    </div>
  )
}

export const ContentLeft: FC<{}> = () => {
  const [view, setView] = useContextState<View>('view')
  const views = useViews()
  const client = useClient()

  const { open } = useDialog()

  const data = {}

  if (views.custom?.length) {
    data['Custom Views'] = views.custom.map(({ id, query, label }) => {
      return {
        label,
        value: { id, query },
      }
    })
  }

  data['Default Views'] = views.default?.map(({ id, query, label }) => {
    return {
      label,
      value: { id, query },
    }
  })

  return views.loading ? (
    <div
      style={{
        width: 234,
        borderRight: border(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>
        <LoadingIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
        Loading content views
      </span>
    </div>
  ) : (
    <Menu
      isActive={(currentView) => {
        return currentView?.id === view
      }}
      onChange={(v) => setView(v)}
      collapse
      style={{
        paddingTop: 24,
        minWidth: 234,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      header={
        <RowSpaced
          style={{
            marginBottom: 24,
          }}
        >
          <Text size="22px" weight="700" style={{ lineHeight: '32px' }}>
            Content
          </Text>
          <Button
            onClick={() => {
              open(<AddCustomViewModal />)
            }}
            style={{ marginRight: -8 }}
            ghost
            icon={<AddIcon />}
          />
        </RowSpaced>
      }
      data={data}
    />
  )
}
