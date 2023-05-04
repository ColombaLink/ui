import React, { FC } from 'react'
import { Button, useContextState, RedoIcon, StopIcon, Row } from '~'
import { Env } from '@based/machine-config'
import { useClient } from '@based/react'

export const Commands: FC<{ configName: string }> = ({ configName }) => {
  const [env] = useContextState<Env>('env')
  const client = useClient()

  return (
    <Row>
      <Button
        icon={<StopIcon />}
        onClick={() => {
          client.call('send-commands', {
            ...env,
            commands: [
              {
                command: 'stop',
                configName,
                service: '*',
              },
            ],
          })
        }}
        ghost
      >
        Stop all
      </Button>
      <Button
        onClick={() => {
          client.call('send-commands', {
            ...env,
            commands: [
              {
                command: 'restart',
                configName,
                service: '*',
              },
            ],
          })
        }}
        icon={<RedoIcon />}
        ghost
      >
        Restart all
      </Button>
    </Row>
  )
}
