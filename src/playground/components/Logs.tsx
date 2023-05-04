import React from 'react'
import ComponentViewer from '../ComponentViewer'

export const Logs = () => {
  return (
    <ComponentViewer
      title="Logs"
      examples={[
        {
          code: `
import { Logs } from '@based/ui';

const data = [
];
for (let i = 0; i < 100; i++) {
  data.push({
    msg: 'this is an error ' + i
  });
}

<div
  style={{
    display: 'flex',
    maxHeight: 600
  }}
>
  <Logs data={data}/>
</div>
`,
        },
      ]}
    />
  )
}
