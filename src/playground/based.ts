import based, { BasedClient } from '@based/client'

export const cluster = 'blap'

export const project = 'test'
export const org = 'saulx'
export const env = 'ci'

export const client = new BasedClient({
  project,
  org,
  env,
  name: '@based/env-admin-hub',
  cluster,
})

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
