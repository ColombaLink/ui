/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, ReactNode } from 'react'

type open = (children: ReactNode) => number

export type DialogContextType = open & {
  open: open
  close: (id?: number) => void
  confirm: (id?: string | number, children?: JSX.Element) => Promise<boolean>
  alert: (id?: string | number, children?: JSX.Element) => boolean
  prompt: (
    id?: string | number,
    children?: JSX.Element
  ) => Promise<boolean | string>
  useCount: () => number
  _id?: number
}

export const defaultDialogContext: DialogContextType = Object.assign(
  function (children: ReactNode): number {
    return 0
  },
  {
    open: (children: ReactNode) => 0,
    close: (id?: number) => {},
    confirm: async (id?: string | number, children?: JSX.Element) => false,
    alert: (id?: number) => false,

    prompt: async (id?: string | number, children?: JSX.Element) => false,
    useCount: () => 0,
    _id: 0,
  }
)

export const DialogContext = createContext<DialogContextType>(undefined)
