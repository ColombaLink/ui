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
  EyeIcon,
  ScreensIcon,
  MenuData,
} from '~'
import { useViews } from '../hooks/useViews'
import { AddViewModal } from '../ViewModals'

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
  const [view, setView] = useContextState<string>('view')
  const { views, loading } = useViews()

  const { open } = useDialog()

  const data: MenuData = {}

  for (const view of views) {
    if (!data[view.category]) {
      data[view.category] = []
    }
    // @ts-ignore
    data[view.category].push({
      label: view.name,
      value: view,
      icon:
        // @ts-ignore TODO tmp structure
        view.config?.view === 'table' ? (
          <EyeIcon />
        ) : view.config?.type === 'components' ? (
          <ScreensIcon />
        ) : undefined,
    })
  }

  return loading ? (
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
      onChange={(v) => setView(v.id)}
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
              open(<AddViewModal />)
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
