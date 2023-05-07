import React from 'react'
import ComponentViewer from '../ComponentViewer'

// const testmsg = `-- [ <script language="javascript">alert("wawa")</script> \x1b[34mblue\x1b[39m \x1b[35mmagenta\x1b[39m \x1b[32mgreen\x1b[39m`
const testmsg = `\x1b[34mjob thingy \x1b[33myellow\x1b[34m\x1b[39m  \x1b[35mmagenta \x1b[39m \x1b[32mgreen\x1b[39m`

console.log({ testmsg })
export const Logs = () => {
  return (
    <ComponentViewer
      title="Logs"
      examples={[
        {
          props: {
            data: [{ msg: testmsg }],
          },
        },
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
            maxHeight: 600,
            height: 600,
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
