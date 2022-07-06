import React, { CSSProperties, FC, Dispatch, SetStateAction } from 'react'
// TODO: use package when PR is merged. Peerdep for react 17 (not 18)
import Editor from './ReactSImpleEditor'
import { color, copyToClipboard, CopyIcon } from '../../'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import './syntax.css'

export type CodeProps = {
  style?: CSSProperties
  children?: string
  results?: boolean
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
}

export const Code: FC<CodeProps> = ({ children, style, onChange }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 24,
        position: 'relative',
        borderRadius: 8,
        background: color('Background0dp'),
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CopyIcon
          onClick={() => {
            copyToClipboard(children)
          }}
          color={'PrimaryMain'}
        />
      </div>
      <Editor
        value={children}
        onValueChange={(v) => onChange(v)}
        highlight={(code) => {
          try {
            const h = highlight(code, languages.js)
            return h
          } catch (err) {}
        }}
        style={{
          fontSize: 14,
          color: color('Foreground'),
          fontFamily: 'Fira Code',
        }}
      />
    </div>
  )
}
