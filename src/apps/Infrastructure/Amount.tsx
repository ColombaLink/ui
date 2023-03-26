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
  const [min, setMin] = useState(config.min)
  const [max, setMax] = useState(config.max)
  const [env] = useContextState<Env>('env')

  return (
    <RowSpaced style={{ margin: 8 }}>
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
            style={{ marginRight: 8, width: 90 }}
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
            style={{ width: 90 }}
            type="number"
            placeholder="Max"
          />
        </Row>
      </Label>
    </RowSpaced>
  )
}
