
import { Select as SelectComponent } from '~/components/Select'
import ComponentViewer from '../ComponentViewer'

const ms = `import { MultiSelect } from '@based/ui'

<MultiSelect 
  onChange={() => console.log("Snurp")}
  placeholder="select something..."
  label="Something"
  options={['yes','no','for sure']}
/>`

const ms2 = `import { MultiSelect } from '@based/ui'

<MultiSelect 
  onChange={() => console.log("Snurp")}
  placeholder="select something..."
  label="Something"
  filterable="create"
  options={['yes','no','for sure']}
/>`

export const Select = () => {
  return (
    <>
      <ComponentViewer
        component={SelectComponent}
        propsName="SelectProps"
        examples={[
          {
            props: {
              value: 'yes',
              onChange: () => console.info('Snurp'),
              placeholder: 'select something...',
              label: 'Something',
              options: ['yes', 'no', 'for sure'],
            },
          },
          {
            props: {
              value: 'yes',
              disableReselect: true,
              onChange: () => console.log('Snurp'),
              placeholder: 'Forced selection...',
              label: 'Force',
              options: ['yes', 'no', 'for sure'],
            },
          },
          {
            code: ms,
          },
          {
            code: ms2,
          },
        ]}
      />
    </>
  )
}
