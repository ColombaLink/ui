import React, { FC, useState } from 'react'
import {
  Input,
  Label,
  Row,
  border,
  RowSpaced,
  Accept,
  useContextState,
} from '~'
import { useClient } from '@based/react'
import { MachineConfig, Env } from '@based/machine-config'

export const Amount: FC<{
  config: MachineConfig
  id: string
}> = ({ config, id }) => {
  const client = useClient()
  const [min, setMin] = useState(config.min)
  const [max, setMax] = useState(config.max)
  const [env] = useContextState<Env>('env')

  console.log(env)

  return (
    <RowSpaced
      style={{
        borderBottom: border(1),
        paddingBottom: 24,
        marginBottom: 32,
      }}
    >
      <Label
        labelWidth={208}
        direction="row"
        label="Amount of machines"
        description="Min/Max amount of machines"
      >
        <Row>
          <Input
            onChange={(v) => {
              if (max < v) {
                setMax(v)
              }
              setMin(v)
            }}
            value={min}
            style={{ marginRight: 8, width: 75 }}
            type="number"
            placeholder="Min"
          />
          <Input
            onChange={(v) => {
              if (v < min) {
                setMin(v)
              }
              setMax(v)
            }}
            value={max}
            style={{ width: 75 }}
            type="number"
            placeholder="Max"
          />

          {config.min !== min || config.max !== max ? (
            <Accept
              onCancel={() => {
                setMin(config.min)
                setMax(config.max)
              }}
              onAccept={async () => {
                const x = {
                  ...env,
                  config: {
                    min,
                    max,
                  },
                  configName: id,
                }
                await client.call('update-machine-config', x)
              }}
            />
          ) : null}
        </Row>
      </Label>
    </RowSpaced>
  )
}
