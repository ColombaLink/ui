import React, { FC, useState } from 'react'
import {
  Input,
  CheckIcon,
  Button,
  CloseIcon,
  color,
  Label,
  Row,
  RowSpaced,
} from '~'
import { useClient } from '@based/react'
import { Env } from './types'

export const Amount: FC<{
  env: Env
  config: any
  id: string
}> = ({ env, config, id }) => {
  const client = useClient()
  const [min, setMin] = useState(config.min)
  const [max, setMax] = useState(config.max)

  return (
    <RowSpaced
      style={{
        borderBottom: `1px solid ${color('border')}`,
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
            <Row>
              <Button
                onClick={() => {
                  setMin(config.min)
                  setMax(config.max)
                }}
                color="text2"
                ghost
                style={{ marginLeft: 16 }}
                icon={<CloseIcon />}
              />
              <Button
                onClick={async () => {
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
                ghost
                style={{ marginLeft: 4 }}
                icon={<CheckIcon />}
              />
            </Row>
          ) : null}
        </Row>
      </Label>
    </RowSpaced>
  )
}
