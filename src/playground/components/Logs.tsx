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
data.push({
  msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ultrices est. Mauris tortor metus, fringilla eget turpis in, suscipit facilisis ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit id risus sed pharetra. Vestibulum ante velit, posuere eget auctor nec, scelerisque ut tortor. Duis rhoncus mauris tincidunt magna mattis pretium. Etiam sit amet ipsum quis justo condimentum vulputate ac sed eros. Vivamus pretium finibus leo ac suscipit. Cras sit amet tortor in augue ultrices fringilla non at metus. Nullam mattis eleifend nisi quis aliquam. Vestibulum a euismod nibh. Sed vitae ligula nulla.'
});

<div
  style={{
    display: 'flex',
    border: '1px solid blue',
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
