import based, { BasedClient } from '@based/client'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { parseQuery } from '@saulx/utils'

// const q = parseQuery(decodeURIComponent(window.location.href.split('?')[1]))

export let cluster = 'local' // String((q && q.cluster) ?? 'local')

export const project = 'based-cloud'
export const org = 'saulx'
export const env = 'platform'

export const client = new BasedClient({
  project,
  org,
  env,
  name: '@based/env-admin-hub',
  cluster,
})

global.basedClient = client

client.on('connect', () => {
  console.info('connected')
})

export const adminClient = based({
  org: 'saulx',
  project: 'based-cloud',
  env: 'platform',
  name: '@based/admin-hub',
  cluster,
})

adminClient.on('connect', () => {
  console.info('admin hub connected')
})

// adminClient.on('debug', (x) => {
//   console.info('based platform hub', x)
// })
