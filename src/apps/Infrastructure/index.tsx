import React, { FC } from 'react'
import { Style, styled } from 'inlines'
import { StateProvider, useContextState } from '~/hooks'
import { Machines } from './Configs'
import { Env } from '@based/machine-config'
import { MachineTable } from './MachineTable'
export { EnvMachinesStatus } from './EnvMachinesStatus'
export { useMachineStatus } from './useMachineStatus'

const Routes: FC<{ env: Env; envAdminHub: any }> = ({ env, envAdminHub }) => {
  const [infraSection] = useContextState('infraSection', 'overview')
  if (infraSection && infraSection !== 'overview') {
    return (
      <MachineTable
        configName={infraSection === 'all' ? undefined : infraSection}
        envAdminHub={envAdminHub}
      />
    )
  }
  return <Machines envAdminHub={envAdminHub} env={env} />
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
