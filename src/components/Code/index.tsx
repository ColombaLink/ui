import React, {
  CSSProperties,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
// TODO: use package when PR is merged. Peerdep for react 17 (not 18)
import Editor from './ReactSImpleEditor'
import { color, renderOrCreateElement } from '../../'
import { Space } from '~/types'
import { spaceToPx } from '~/utils'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'

// import 'prismjs/components/prism-tsx'

import 'prismjs/components/prism-json'
import './syntax.css'

/*code menu
<CopyIcon
   onClick={() => {
    copyToClipboard(children)
  }}
  color={'PrimaryMain'}
/>`
*/

export type CodeProps = {
  style?: CSSProperties
  value?: string
  space?: Space
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  topRight?: FC | ReactNode
}

export const Code: FC<CodeProps> = ({
  topRight,
  value,
  style,
  onChange,
  space,
}) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 16,
        position: 'relative',
        maxWidth: '100%',
        borderRadius: 4,
        border: '1px solid ' + color('OtherDivider'),
        background: color('Background2dp'),
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      {topRight ? (
        <div
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          {renderOrCreateElement(topRight, {})}
        </div>
      ) : null}
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => {
          try {
            const h = highlight(code, languages.js)
            return h
          } catch (err) {}
        }}
        style={{
          fontSize: 14,
          color: color('PrimaryMain'),
          fontFamily: 'Fira Code',
        }}
      />
    </div>
  )
}
