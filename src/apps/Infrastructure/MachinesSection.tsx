import { MachineConfig } from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC } from 'react'
import { color, Button, AccordionItem, ReplaceIcon, Badge } from '~'
import { styled } from 'inlines'
import { Status } from './Status'

export const MachinesSection: FC<{
  configName: string
  config: MachineConfig
  machines: Machine[]
  expanded?: boolean
}> = ({ config, configName, machines, expanded }) => {
  return (
    <AccordionItem
      label="Machines"
      expanded={expanded}
      topRight={<Status running={machines.length} type="machine" />}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderBottom: '1px solid ' + color('border'),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button icon={<ReplaceIcon />} ghost>
            Reboot all
          </Button>
        </styled.div>
      </styled.div>
    </AccordionItem>
  )
}
