import React from 'react'

import {
  Code,
  Button,
  ContextItem,
  ContextDivider,
  useContextMenu,
  DuplicateIcon,
  DeleteIcon,
} from '~'

export const ContextHook = () => {
  const codeExample = `
    import {ContextItem, ContextDivider, useContextMenu} from '@based/ui'

    // create a context menu component
    const TestMenu = () => {
        return (
          <>
            <ContextItem icon={DuplicateIcon}>Duplicate</ContextItem>
            <ContextDivider />
            <ContextItem onClick={() => {}} icon={DeleteIcon}>
              Delete
            </ContextItem>
          </>
        )
      }

    // use the hook (context menu you want to show, children, position)
    <Button onClick={useContextMenu(TestMenu, {} , { placement: 'left' })}>Click me</Button>
    `

  return (
    <>
      <Code value={codeExample} space />
      <Button onClick={useContextMenu(TestMenu, {}, { placement: 'left' })}>
        Click me
      </Button>
    </>
  )
}

const TestMenu = () => {
  return (
    <>
      <ContextItem onClick={() => {}} icon={DuplicateIcon}>
        Duplicate
      </ContextItem>
      <ContextDivider />
      <ContextItem onClick={() => {}} icon={DeleteIcon}>
        Delete
      </ContextItem>
    </>
  )
}
