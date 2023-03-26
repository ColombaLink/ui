import React from 'react'
import { SettingsGroup as Sg } from '~'
import ComponentViewer from '../ComponentViewer'

export const SettingsGroup = () => {
  return (
    <ComponentViewer
      title="SettingsGroup"
      component={Sg}
      examples={[
        {
          props: {
            data: {
              port: {
                type: 'number',
                description: 'Network port',
              },
              'args.name': {
                label: 'Name',
                type: 'text',
                description: 'Instance name',
              },
            },
            values: {
              port: 443,
              args: {
                name: 'hello',
              },
            },
            onChange: (values) => console.info(values),
          },
        },
        {
          props: {
            labelWidth: 130,
            allwaysAccept: true,
            onChange: () => {},
            data: {
              port: {
                type: 'number',
                description: 'Network port',
              },
              'args.name': {
                label: 'Name',
                type: 'text',
                description: 'Instance name',
              },
              'args.securityLevel': {
                label: 'Threat sensitivity',
                description: 'Auto block ips',
                options: ['Level 1', 'Level 2', 'Level 3'],
              },
              'args.sharedPort': {
                type: 'boolean',
                label: 'Shared port',
              },
            },
          },
        },
      ]}
    />
  )
}
