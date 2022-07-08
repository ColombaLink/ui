import '../assets/global.css'
import '../assets/fonts.css'
// crashes in next...

import { themes } from './themes'

themes()

// for now use wouter
export { Route, useLocation, useRoute, useRouter, Switch, Router } from 'wouter'

export * from './components/Auth'
export * from './components/Avatar'
export * from './components/Badge'
export * from './components/Button'
export * from './components/Checkbox'
export * from './components/Code'
export * from './components/ColorPicker'
export * from './components/Container'
export * from './components/ContextMenu'
export * from './components/Dialog'
export * from './components/Form'
export * from './components/Input'
export * from './components/Link'
export * from './components/ListItems'
export * from './components/Logo'
export * from './components/Menu'
export * from './components/Page'
export * from './components/Provider'
export * from './components/Sidebar'
export * from './components/Steps'
export * from './components/Table'
export * from './components/Text'
export * from './components/Topbar'
export * from './icons'
export * from './hooks'
export * from './utils'
