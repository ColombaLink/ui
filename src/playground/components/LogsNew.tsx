import React from 'react'
import ComponentViewer from '../ComponentViewer'
import {
  Text,
  Avatar,
  CalendarIcon,
  CheckIcon,
  styled,
  NewLogs,
  NewLogsObject,
} from '~'

export const LogsNew = () => {
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
      msg: 'Flippie yeoo',
      ts: 1087460313474,
      subType: testPerson,
      icon: CheckIcon,
      color: 'accent',
    },
    {
      type: 'authorize',
      status: 'error',
      msg: 'Flap 1',
      ts: 1687460013474,
      subType: testPerson,
      icon: CheckIcon,
      color: 'accent',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Error: Incomplete form at contact (/home/ec2-user/data/env-hub/functions/11397579897987:4971:11)at Object.wrappedFn [as fn] (/home/ec2-user/services/env-hub/dist/index.js:114467:30)at sendFunction (/home/ec2-user/services/env-hub/dist/index.js:4783:12) at /home/ec2-user/services/env-hub/dist/index.js:3860:11',
      ts: 1387460373474,
      subType: 'Contact your boy flip',
      icon: CalendarIcon,
      color: 'orange',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Error: Incomplete form at contact (/home/ec2-user/data/env-hub/functions/11397579897987:4971:11)at Object.wrappedFn [as fn] (/home/ec2-user/services/env-hub/dist/index.js:114467:30)at sendFunction (/home/ec2-user/services/env-hub/dist/index.js:4783:12) at /home/ec2-user/services/env-hub/dist/index.js:3860:11',
      ts: 1587460373474,
      subType: 'Contact your boy flip',
      icon: CalendarIcon,
      color: 'orange',
    },

    {
      type: 'authorize',
      status: 'info',
      msg: 'Authorize!',
      ts: 1787460373474,
      subType: 'Beep Boop....',
      icon: CalendarIcon,
      color: 'green',
    },
    {
      type: 'authorize',
      status: 'info',
      msg: 'Authorize!',
      ts: 1787460343474,
      subType: 'Beep Boop....',
      icon: CalendarIcon,
      color: 'red',
    },
    {
      type: 'authorize',
      status: 'info',
      msg: '🔔 Flap 2',
      ts: 1687460373474,
      subType: testPerson,
      icon: CheckIcon,
      color: 'accent',
    },
    {
      type: 'authorize',
      status: 'info',
      msg: '🔔 Flap 3',
      ts: 1687460323474,
      subType: testPerson,
      icon: CheckIcon,
      color: 'accent',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Hallloeaaaaaa 🧶: ',
      ts: 1887460373474,
      subType: testPerson,
      icon: CalendarIcon,
      color: 'orange',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Hallloeafaewfawaewfaewfe 🧶: ',
      ts: 1887460333474,
      subType: testPerson,
      icon: CalendarIcon,
      color: 'orange',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Hallloeaefeawfewaff 🧶: ',
      ts: 1887460379474,
      subType: testPerson,
      icon: CalendarIcon,
      color: 'orange',
    },
    {
      type: 'once-contact',
      status: 'succes',
      msg: 'Hallloeafaewfawaewfaewfe 🧶: ',
      ts: 1887460383474,
      subType: testPerson,
      icon: CalendarIcon,
      color: 'orange',
    },
  ]

  return (
    <>
      {/* <ComponentViewer
        title="NewLogs"
        propsName="NewLogsProps"
        examples={[
          {
            props: {
              data: testExample,
              groupByTime: 15,
            },
          },
        ]}
      /> */}

      <NewLogs data={testExample as NewLogsObject} groupByTime={15} />
    </>
  )
}
