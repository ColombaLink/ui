import React, { FC } from 'react'
import { Style, styled } from 'inlines'
import { StateProvider, useContextState } from '~/hooks'
import { InfraLeft } from './InfraLeft'
import { Machines } from './Machines'
import { Env } from '@based/machine-config'
import { Overview } from './Overview'

const Routes: FC<{ env: Env; envAdminHub: any }> = ({ env, envAdminHub }) => {
  const [infraSection] = useContextState('infraSection', 'config')
  if (infraSection === 'machines') {
    return <Machines env={env} />
  }
  if (infraSection === 'overview') {
    return <Overview envAdminHub={envAdminHub} />
  }
  return null
}

export const Infrastructure: FC<{
  style?: Style
  env: Env
  envAdminHub: any
  onChange?: (key: string, val: string) => void
  values?: {
    infraSection: string
    expanded?: { [key: string]: boolean }
    env?: Env
  }
}> = ({
  env,
  style,
  envAdminHub,
  values = {
    infraSection: '',
    expanded: {},
    env,
  },
  onChange,
}) => {
  if (!values.expanded) {
    values.expanded = {}
  }
  if (!values.env) {
    values.env = env
  }
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
        <Routes envAdminHub={envAdminHub} env={env} />
      </StateProvider>
    </styled.div>
  )
}
