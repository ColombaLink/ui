import React from 'react'
import { Code as CodeBox } from '~/components/Code'
import ComponentViewer from '../ComponentViewer'

const raw = `import React from 'react'
import { Callout } from '~/components/Callout'
import { ErrorIcon, ArrowRightIcon, CheckCircleIcon, ModelIcon } from '~/icons'

export const Callouts = () => {
  return (
    <>
      <Callout space color="Red" foregroundColor="PurpleDark">
        Normal regular callout
      </Callout>
    </>
  )
}
`

export const Code = () => {
  return (
    <>
      <ComponentViewer component={CodeBox} propsName={'CodeProps'} />
      <CodeBox>{raw}</CodeBox>
    </>
  )
}
