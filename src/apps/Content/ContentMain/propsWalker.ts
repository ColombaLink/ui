import { BasedClient } from '@based/client'

// state
// args
// data

export const propsWalker = (
  obj: any,
  ctx: { data: any; state: any; args: any[]; client: BasedClient }
): any => {
  if (typeof obj !== 'object') {
    return {}
  }

  // so make a new object
  const newObj: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    const field = obj[key]

    console.log('🔑', key)

    if (/^on[A-Z]([a-z])+/.test(key)) {
      if (typeof field === 'object') {
        if (Object.keys(field.type)[0] === 'function') {
          console.log('reached this', key, field)

          newObj[key] = async (...args) => {
            const fn = propsWalker(field.type.function, {
              data: ctx.data,
              state: ctx.state,
              args,
              client: ctx.client,
            })

            console.log('🧧', fn)
            console.log('🔔', ctx.client.call(fn.name, fn.payload))

            return ctx.client.call(fn.name, fn.payload)
          }
        } else if (Object.keys(field.type)[0] === 'view') {
          console.log('🎁if type is view -> VIEW Thingies here')
        }
      } else {
        newObj[key] = () => console.error('Needs to be an object def')
      }
    } else if (typeof field === 'object') {
      newObj[key] = propsWalker(field, ctx)
    } else if (typeof field === 'string') {
      if (field[0] === '$') {
        // $data, $args, $state, $target
        const path = field.split('.')
        const type = path[0]
        if (type === '$data') {
          console.log('found $data')

          let d = ctx.data
          for (let i = 1; i < path.length; i++) {
            const seg = path[i]
            console.log('seg', seg)
            if (d?.[seg] !== undefined) {
              d = d[seg]
            } else {
              d = undefined
              break
            }
          }
          newObj[key] = d
        } else if (type === '$args') {
          // lets add some args!
          newObj[key] = 'latewr!!@#'
        } else if (type === '$state') {
          console.log('stateee')
        } else if (type === '$target') {
          console.log('target aquired')
        } else {
          console.log('snurp')
        }
      } else {
        newObj[key] = field
      }
    } else {
      newObj[key] = field
    }
  }

  console.log('THIS???', newObj)
  return newObj
}
