import { useContext } from 'react'
import {
  DialogContext,
  DialogContextType,
  defaultDialogContext,
} from './DialogContext'

export const useDialog: () => DialogContextType = () => {
  const Dialog = useContext(DialogContext)
  if (Dialog) {
    return Dialog
  }
  const noContext = defaultDialogContext
  return noContext
}
