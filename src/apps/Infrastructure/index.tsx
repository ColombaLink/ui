import React, { FC } from 'react'
import { Style, styled } from 'inlines'
import { StateProvider, useContextState } from '~/hooks'
import { InfraLeft } from './InfraLeft'
import { Machines } from './Machines'
import { Env } from './types'

const Routes: FC<{ env: Env }> = ({ env }) => {
  const [infraSection] = useContextState('infraSection', 'config')
  if (infraSection === 'machines') {
    return <Machines env={env} />
  }
  return null
}

export const Infrastructure: FC<{
  style?: Style
  env: Env
  onChange?: (key: string, val: string) => void
  values?: {
    infraSection: string
  }
}> = ({ env, style, values, onChange }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'hidden',
        ...style,
      }}
    >
      <StateProvider values={values} onChange={onChange}>
        <InfraLeft />
        <Routes env={env} />
      </StateProvider>
    </styled.div>
  )
}
