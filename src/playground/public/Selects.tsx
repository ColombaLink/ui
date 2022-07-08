import React from 'react'
import { Provider, AddIcon } from '~'
import { MultiSelect, Select } from '~/components/Select'
import ComponentViewer from '../ComponentViewer'

const ms = `import { MultiSelect } from '@based/ui'

<MultiSelect 
  onChange={() => console.log("Snurp")}
  placeholder="select something..."
  label="Something"
  options={['yes','no','for sure']}
/>`

export const Selects = () => {
  return (
    <>
      <ComponentViewer
        component={Select}
        examples={[
          {
            props: {
              onChange: () => console.log('Snurp'),
              placeholder: 'select something...',
              label: 'Something',
              options: ['yes', 'no', 'for sure'],
            },
          },
          {
            code: ms,
          },
        ]}
      />
    </>
  )
}
