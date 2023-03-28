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
import { MachineStatus } from './MachineStatus'
import { Machine as MachineType, MachineConfig } from '@based/machine-config'

const Machine: FC<{
  machine: MachineType
}> = ({ machine }) => {
  const [copied, copy] = useCopyToClipboard(machine.id)
  return (
    <RowSpaced
      style={{
        borderBottom: border(1),
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <Row>
        <MachineStatus status={machine.status} />
        <Button
          style={{ marginLeft: 8 }}
          clickAnimation
          onClick={() => copyToClipboard(machine.publicIp)}
          ghost
          transparent
        >
          {machine.publicIp}
        </Button>
        {machine.domain ? (
          <Button
            clickAnimation
            onClick={() => copyToClipboard(machine.domain)}
            ghost
            transparent
          >
            <Text color="text2">CloudId: {machine.domain}</Text>
          </Button>
        ) : null}
        <Button
          clickAnimation
          onClick={() => copyToClipboard(machine.cloudMachineId)}
          ghost
          transparent
        >
          <Text color="text2">CloudId: {machine.cloudMachineId}</Text>
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
      topRight={
        <Status
          goodColor={expanded[expandKey] ? 'accent' : 'green'}
          running={machines.length}
          type="machine"
        />
      }
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 8,
          paddingBottom: machines.length > 1 ? 24 : 0,
        }}
      >
        {machines.length > 1 ? (
          <Button icon={<ReplaceIcon />} ghost>
            Reboot all
          </Button>
        ) : null}
      </RowEnd>
      {machines.map((m) => {
        return <Machine machine={m} key={m.id} />
      })}
    </AccordionItem>
  )
}
