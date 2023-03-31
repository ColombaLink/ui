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
          onChange(values)
        }}
        labelWidth={208}
        fieldWidth={260}
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
            default: 'medium',
            options: [
              {
                value: 'micro',
                label: (
                  <Row>
                    <Text weight="700" style={{ marginRight: 16, width: 100 }}>
                      Micro
                    </Text>{' '}
                    <Badge style={{ marginRight: 4 }}>2vCPU</Badge>
                    <Badge>1GiB</Badge>
                  </Row>
                ),
              },
              {
                value: 'medium',
                label: (
                  <Row>
                    <Text weight="700" style={{ marginRight: 16, width: 100 }}>
                      Medium
                    </Text>{' '}
                    <Badge style={{ marginRight: 4 }}>2vCPU</Badge>
                    <Badge>2GiB</Badge>
                  </Row>
                ),
              },
              {
                value: 'large',
                label: (
                  <Row>
                    <Text weight="700" style={{ marginRight: 16, width: 100 }}>
                      Large
                    </Text>{' '}
                    <Badge style={{ marginRight: 4 }}>2vCPU</Badge>
                    <Badge>8GiB</Badge>
                  </Row>
                ),
              },
              {
                value: 'xlarge',
                label: (
                  <Row>
                    <Text weight="700" style={{ marginRight: 16, width: 100 }}>
                      xlarge
                    </Text>{' '}
                    <Badge style={{ marginRight: 4 }}>4vCPU</Badge>
                    <Badge>16GiB</Badge>
                  </Row>
                ),
              },
              {
                value: 'xxlarge',
                label: (
                  <Row>
                    <Text weight="700" style={{ marginRight: 16, width: 100 }}>
                      xxLarge
                    </Text>{' '}
                    <Badge style={{ marginRight: 4 }}>8vCPU</Badge>
                    <Badge>32GiB</Badge>
                  </Row>
                ),
              },
            ],
          },
        }}
      />
    </AccordionItem>
  )
}
