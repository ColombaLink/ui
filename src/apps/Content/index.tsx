import React, { FC, useEffect, useState } from 'react'
import { ContentLeft } from './ContentLeft'
import { Style, styled } from 'inlines'
import { StateProvider } from '../../hooks/ContextState'
import { ContentMain } from './ContentMain'
import { useClient } from '@based/react'
import { BasedClient } from '@based/client'

export const Content: FC<{
  style?: Style
  values?: { db: string; view: string }
  onChange?: (key: string, val: string) => void
}> = ({ style, values, onChange }) => {
  const client = useClient()
  const [hubClient, setHubClient] = useState<BasedClient>()

  useEffect(() => {
    const hClient = new BasedClient({
      project: client.opts.project,
      env: client.opts.env,
      org: client.opts.org,
      cluster: client.opts.cluster,
      key: 'cms',
      // TODO: fix rule
      // optionalKey: true,
    })
    hClient.setAuthState({ ...client.authState, type: 'based' })
    setHubClient(hClient)
    return () => {
      hClient.destroy()
    }
  }, [])

  return (
    <styled.div
      style={{
        display: 'flex',
        flexGrow: 1,
        // overflowX: 'hidden',
        // overflowY: 'hidden',
        ...style,
      }}
    >
      <StateProvider values={values} onChange={onChange}>
        <ContentLeft />
        <ContentMain hubClient={hubClient} />
      </StateProvider>
    </styled.div>
  )
}
