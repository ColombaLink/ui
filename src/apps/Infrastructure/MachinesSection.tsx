import { MachineConfig } from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC } from 'react'
import {
  Button,
  AccordionItem,
  Text,
  border,
  ReplaceIcon,
  Badge,
  useContextState,
  useCopyToClipboard,
  CheckIcon,
  CopyIcon,
  copyToClipboard,
  Row,
  RowSpaced,
  RowEnd,
} from '~'
import { Status } from './Status'
import { Machine as MachineType } from './types'

const Machine: FC<{
  machine: MachineType
}> = ({ machine }) => {
  const [copied, copy] = useCopyToClipboard(machine.id)
  return (
    <RowSpaced>
      <Row>
        <Text>Status {machine.status}</Text>
        <Button
          clickAnimation
          onClick={() => copyToClipboard(machine.publicIp)}
          ghost
          transparent
        >
          {machine.publicIp}
        </Button>
        <Button
          clickAnimation
          onClick={() => copyToClipboard(machine.cloudMachineId)}
          ghost
          transparent
        >
          <Text typo="caption500">CloudId: {machine.cloudMachineId}</Text>
        </Button>
      </Row>
      <Row>
        <Button
          ghost
          transparent
          clickAnimation
          onClick={() => {
            copy()
          }}
          icon={
            <Badge iconRight={copied ? <CheckIcon /> : <CopyIcon />}>
              {machine.id}
            </Badge>
          }
        />
        <Button
          ghost
          clickAnimation
          onClick={() => {
            copy()
          }}
          icon={<ReplaceIcon />}
        />
      </Row>
    </RowSpaced>
  )
}

export const MachinesSection: FC<{
  configName: string
  config: MachineConfig
  machines: MachineType[]
}> = ({ config, configName, machines }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 'm'
  return (
    <AccordionItem
      label="Machines"
      onExpand={(v) => {
        if (!v) {
          delete expanded[expandKey]
        } else {
          expanded[expandKey] = v
        }
        setExpanded(expanded)
      }}
      expanded={expanded[expandKey]}
      topRight={<Status running={machines.length} type="machine" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Button color="accent" icon={<ReplaceIcon />} ghost>
          Reboot all
        </Button>
      </RowEnd>
      {machines.map((m) => {
        return <Machine machine={m} key={m.id} />
      })}
    </AccordionItem>
  )
}
