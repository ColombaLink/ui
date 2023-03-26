/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import {
  ContextItem,
  ContextDivider,
  ExpandRightIcon,
  ReplaceIcon,
  DuplicateIcon,
  MoreIcon,
  useContextMenu,
  Button,
  StopIcon,
  CloseIcon,
  CurlyBracesIcon,
} from '~'
import {
  MachineConfig,
  ServiceInstance,
} from '../../../../based-cloud/packages/machine-config/dist'

type Actions = {
  configName: string
  config: MachineConfig
  servicesInstances?: ServiceInstance & { index: string | number }[]
}

export const ActionMenu: FC<Actions> = ({
  servicesInstances,
  config,
  configName,
}) => {
  return (
    <>
      {servicesInstances ? null : (
        <ContextItem icon={<ReplaceIcon />}>Reboot all machines</ContextItem>
      )}
      <ContextItem icon={<ExpandRightIcon />}>
        (Re)Start all services
      </ContextItem>
      <ContextItem icon={<StopIcon />}>Stop all services</ContextItem>
      <ContextDivider />
      {servicesInstances ? null : (
        <ContextItem icon={<DuplicateIcon />}>Duplicate</ContextItem>
      )}
      <ContextItem
        icon={
          <div>
            <CurlyBracesIcon size="12px" />
          </div>
        }
      >
        Edit JSON
      </ContextItem>
      <ContextDivider />
      <ContextItem icon={<CloseIcon />}>Remove</ContextItem>
    </>
  )
}

export const ActionMenuButton: FC<Actions> = (props) => {
  return (
    <Button
      onClick={useContextMenu(ActionMenu, props, {
        offset: { y: -36, x: 0 },
      })}
      ghost
      color="text"
      icon={<MoreIcon />}
    />
  )
}
