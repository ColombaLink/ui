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
          code: `import { SettingsGroup, useRoute } from '@based/ui'
const route = useRoute();

<SettingsGroup 
  alwaysAccept
  labelWidth={130}
  onChange={(changed) => {
    route.setQuery(changed)
  }}
  values={route.query}
  data={{
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
      options: [{ value: 1, label: 'Level 1'}, { value: 2, label: 'Level 2' }],
    },
    'args.sharedPort': {
      type: 'boolean',
      label: 'Shared port',
    }
  }}

/>

  `,
        },
      ]}
    />
  )
}
