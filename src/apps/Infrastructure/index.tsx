import React, { FC } from 'react'
import { Style, styled } from 'inlines'
import { StateProvider, useContextState } from '~/hooks'
import { Machines } from './Machines'
import { Env } from '@based/machine-config'
import { MachineTable } from './MachineTable'

const Routes: FC<{ env: Env; envAdminHub: any }> = ({ env, envAdminHub }) => {
  const [infraSection] = useContextState('infraSection', 'overview')

  if (infraSection && infraSection !== 'overview') {
    return <MachineTable env={env} />
  }

  // machine table

  return <Machines envAdminHub={envAdminHub} env={env} />
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
        <Routes envAdminHub={envAdminHub} env={env} />
      </StateProvider>
    </styled.div>
  )
}
