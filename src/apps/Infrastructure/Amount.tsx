import React, { FC, useState } from 'react'
import { Text, Input, CheckIcon, Button, CloseIcon, color } from '~'
import { useQuery, useClient } from '@based/react'
import { Env } from './types'
import { styled } from 'inlines'
import { deepCopy, deepMerge } from '@saulx/utils'

export const Amount: FC<{
  env: Env
  config: any
  id: string
}> = ({ env, config, id }) => {
  const client = useClient()

  const [min, setMin] = useState(config.min)
  const [max, setMax] = useState(config.max)

  return (
    <styled.div
      style={{
        borderTop: `1px solid ${color('border')}`,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 12,
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ marginRight: 8 }}>Amount</Text>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
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
                console.log(x)
                await client.call('update-machine-config', x)
              }}
              ghost
              style={{ marginLeft: 4 }}
              icon={<CheckIcon />}
            />
          </styled.div>
        ) : null}
      </styled.div>
    </styled.div>
  )
}
