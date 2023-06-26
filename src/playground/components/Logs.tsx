import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { NewLogs } from '~/components/Logs/NewLogs'
import { styled } from 'inlines'
import { Text, Avatar, CalendarIcon, CheckIcon } from '~'

// const testmsg = `-- [ <script language="javascript">alert("wawa")</script> \x1b[34mblue\x1b[39m \x1b[35mmagenta\x1b[39m \x1b[32mgreen\x1b[39m`
const testmsg = `\x1b[34mjob thingy \x1b[33myellow\x1b[34m\x1b[39m  \x1b[35mmagenta \x1b[39m \x1b[32mgreen\x1b[39m`

const testPerson = () => {
  return (
    <styled.div style={{ display: 'flex', alignContent: 'center', gap: 8 }}>
      <Avatar
        size={16}
        img="https://robohash.org/YII.png?set=set2"
        color="lightaccent"
      />
      <Text typography="caption500" color="text2">
        Jim de Beer
      </Text>
      <Text typography="caption500" color="text2">
        @ Based Office
      </Text>
    </styled.div>
  )
}

const testExample = [
  {
    type: 'authorize',
    status: 'error',
    msg: 'Error: Incomplete form at contact (/home/ec2-user/data/env-hub/functions/11397579897987:4971:11)at Object.wrappedFn [as fn] (/home/ec2-user/services/env-hub/dist/index.js:114467:30)at sendFunction (/home/ec2-user/services/env-hub/dist/index.js:4783:12) at /home/ec2-user/services/env-hub/dist/index.js:3860:11',
    ts: 1687460373474,
    subType: testPerson,
    icon: CheckIcon,
    color: 'accent',
  },
  {
    type: 'once-contact',
    status: 'succes',
    msg: 'Error: Incomplete form at contact (/home/ec2-user/data/env-hub/functions/11397579897987:4971:11)at Object.wrappedFn [as fn] (/home/ec2-user/services/env-hub/dist/index.js:114467:30)at sendFunction (/home/ec2-user/services/env-hub/dist/index.js:4783:12) at /home/ec2-user/services/env-hub/dist/index.js:3860:11',
    ts: 1687461985237,
    subType: 'Contact your boy flip',
    icon: CalendarIcon,
    color: 'orange',
  },
  {
    type: 'once-contact',
    status: 'succes',
    msg: 'Error: Incomplete form at contact (/home/ec2-user/data/env-hub/functions/11397579897987:4971:11)at Object.wrappedFn [as fn] (/home/ec2-user/services/env-hub/dist/index.js:114467:30)at sendFunction (/home/ec2-user/services/env-hub/dist/index.js:4783:12) at /home/ec2-user/services/env-hub/dist/index.js:3860:11',
    ts: 1687461981222,
    subType: 'Contact your boy flip',
    icon: CalendarIcon,
    color: 'orange',
  },
  {
    type: 'authorize',
    status: 'info',
    msg: 'Authorize!',
    ts: 16071346301831,
    subType: 'Beep Boop....',
    icon: CalendarIcon,
    color: 'green',
  },
  {
    type: 'once-contact',
    status: 'succes',
    msg: 'Hallloe 🧶: ',
    ts: 1687463370190,
    subType: 'Contact your boy flip',
    icon: CalendarIcon,
    color: 'orange',
  },
]

console.log({ testmsg })
export const Logs = () => {
  return (
    <>
      <NewLogs data={testExample} />

      {/* <ComponentViewer
        title="NewLogs"
        propsName="NewLogsProps"
        data={testExample}
      /> */}

      {/* <ComponentViewer
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
      /> */}
    </>
  )
}
