import React, { CSSProperties, FC } from 'react'
// TODO: use package when PR is merged. Check comment inside
import Editor from './ReactSImpleEditor'
import { color, copyToClipboard, CopyIcon } from '../../'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import './syntax.css'

export const Code: FC<{
  style?: CSSProperties
  children?: string
  results?: boolean
}> = ({ children, style }) => {
  return (
    <div
      style={{
        maxWidth: 750,
        width: '100%',
        padding: 24,
        position: 'relative',
        borderRadius: 8,
        background: color(''),
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
            // @ts-ignore
            copyToClipboard(children)
          }}
          color={'background'}
        />
      </div>
      {/* @ts-ignore */}
      <Editor
        /* @ts-ignore */
        value={children}
        onValueChange={(v) => {
          //   setPayload(v)
        }}
        highlight={(code) => {
          try {
            const h = highlight(code, languages.js)
            return h
          } catch (err) {}
        }}
        style={{
          fontSize: 14,
          color: color('background'),
          fontFamily: 'Fira Code',
        }}
      />
    </div>
  )
}
