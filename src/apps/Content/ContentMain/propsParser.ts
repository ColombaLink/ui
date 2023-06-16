import { BasedClient } from '@based/client'
import { View } from '../types'

// state
// args
// data
// target

export type ParseCtx = {
  data: any
  state: any
  args: any[]
  client: BasedClient
  setState: (newState: { [key: string]: any }) => void
  setView: (view: View) => void
  setOverlay: (view: View) => void
}

export const parseFunction = (
  config: any,
  ctx: ParseCtx
): (() => Promise<any>) => {
  // also suppoort .publish, query.get and some others! stream?
  if (config.function) {
    return async (...args) => {
      const { name, payload } = parseProps(config.function, {
        ...ctx,
        args,
      })

      console.log(name, payload, ctx.client)
      return ctx.client.call(name, payload)
    }
  }

  if (config.state) {
    return async (...args) => {
      ctx.setState(
        parseProps(config.state, {
          ...ctx,
          args,
        })
      )
    }
  }

  if (config.view) {
    return async (...args) => {
      ctx.setView(
        parseProps(
          config.view,
          {
            ...ctx,
            args,
          },
          ['props']
        )
      )
    }
  }

  // maybe not the nicest
  if (config.overlay) {
    return async (...args) => {
      ctx.setOverlay(
        parseProps(
          config.overlay,
          {
            ...ctx,
            args,
          },
          ['props']
        )
      )
    }
  }
}

const pathReader = (a: any, path: string[]): any => {
  let d = a
  for (let i = 1; i < path.length; i++) {
    const seg = path[i]
    if (d?.[seg] !== undefined) {
      d = d[seg]
    } else {
      d = undefined
      break
    }
  }
  return d
}

const parseString = (field: string, ctx: ParseCtx): any => {
  if (field[0] === '$') {
    const path = field.split('.')
    const type = path[0]
    if (type === '$data') {
      return pathReader(ctx.data, path)
    }
    if (type === '$args') {
      return pathReader(ctx.args, path)
    }
    if (type === '$state') {
      return pathReader(ctx.state, path)
    }
    if (type === '$target') {
      return 'target acquired ⏳'
    }
  }
  return field
}

export const parseProps = (
  obj: any,
  ctx: ParseCtx,
  excludeFields?: string[]
): any => {
  if (typeof obj !== 'object') {
    return {}
  }
  const newObj: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (excludeFields && excludeFields.includes(key)) {
      newObj[key] = obj[key]
      continue
    }

    const field = obj[key]
    if (/^on[A-Z]([a-z])+/.test(key)) {
      if (typeof field === 'object') {
        newObj[key] = parseFunction(field, ctx)
      } else {
        newObj[key] = () => console.error('Needs to be an object def', field)
      }
    } else if (typeof field === 'object') {
      newObj[key] = parseProps(field, ctx, excludeFields)
    } else if (typeof field === 'string') {
      newObj[key] = parseString(field, ctx)
    } else {
      newObj[key] = field
    }
  }

  return newObj
}
