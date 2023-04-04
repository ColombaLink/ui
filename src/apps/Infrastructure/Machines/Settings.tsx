import React, { FC } from 'react'
import {
  AccordionItem,
  useContextState,
  SettingsGroup,
  Row,
  Badge,
  Text,
} from '~'
import { MachineConfig } from '@based/machine-config'
import { OnMachineConfigChange } from '../types'
import { useQuery } from '@based/react'

export const Settings: FC<{
  configName: string
  config: MachineConfig
  alwaysAccept?: boolean
  onChange: OnMachineConfigChange
}> = ({ config, configName, onChange, alwaysAccept }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 'g'

  const { data: machineTypes = [] } = useQuery(
    'machine-types',
    {},
    {
      persistent: true,
    }
  )

  return (
    <AccordionItem
      onExpand={(v) => {
        if (!v) {
          delete expanded[expandKey]
        } else {
          expanded[expandKey] = v
        }
        setExpanded(expanded)
      }}
      expanded={expanded[expandKey]}
      label="Settings"
    >
      <SettingsGroup
        alwaysAccept={alwaysAccept}
        onChange={(values) => {
          if (values.amount) {
            Object.assign(values, values.amount)
            delete values.amount
          }
          return onChange(values)
        }}
        labelWidth={208}
        fieldWidth={350}
        values={config}
        style={{ minWidth: '100%', maxWidth: 500 }}
        data={{
          amount: {
            type: 'range',
            label: 'Amount of machines',
            description: 'Min/Max amount of machines',
            value: { min: config.min, max: config.max },
          },
          image: {
            type: 'text',
            default: 'based-v1',
            description: 'Image from cloud to use',
          },
          machine: {
            label: 'Machine specs Mem & Cpu',
            description: 'Specs of the machine',
            default: 't3.medium',
            options: machineTypes.map((s) => {
              return {
                value: s.value,
                label: (
                  <Row>
                    <Row style={{ marginRight: 16, width: 200 }}>
                      <Text style={{ marginRight: 8 }} weight="700">
                        {s.name}
                      </Text>
                      <Text color="text2" typo="caption500">
                        €{s.basedPrice}/month
                        {'' +
                          (~~((s.basedPrice / (s.priceMonth * 0.91)) * 100) -
                            100)}
                        %
                      </Text>
                    </Row>
                    <Badge style={{ marginRight: 4 }}>{s.cpus}vCPU</Badge>
                    {s.memory > 1000 ? (
                      <Badge>{s.memory / 1024}TiB</Badge>
                    ) : (
                      <Badge>{s.memory}GiB</Badge>
                    )}
                  </Row>
                ),
              }
            }),
          },
        }}
      />
    </AccordionItem>
  )
}
