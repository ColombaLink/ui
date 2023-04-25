import React, { FC } from 'react'
import { Button, useContextState, RedoIcon, StopIcon, Row } from '~'
import { Env } from '@based/machine-config'
import { useQuery, useClient } from '@based/react'

export const Commands: FC<{ configName: string }> = ({ configName }) => {
  const [env] = useContextState<Env>('env')
  const { data: envData } = useQuery('env', env)
  const client = useClient()

  return (
    <Row>
      <Button
        icon={<StopIcon />}
        onClick={() => {
          const commands = []
          if (envData.machines) {
            for (const machine of envData.machines) {
              if (machine.machineConfigName === configName) {
                commands.push({
                  command: 'restart',
                  machineId: machine.id,
                  service: '*',
                })
              }
            }
            client.call('send-commands', { ...env, commands })
          }
        }}
        ghost
      >
        Stop all
      </Button>
      <Button
        onClick={() => {
          const commands = []
          if (envData.machines) {
            for (const machine of envData.machines) {
              if (machine.machineConfigName === configName) {
                commands.push({
                  command: 'restart',
                  machineId: machine.id,
                  service: '*',
                })
              }
            }
            client.call('send-commands', { ...env, commands })
          }
        }}
        icon={<RedoIcon />}
        ghost
      >
        Restart all
      </Button>
    </Row>
  )
}
