import React from 'react'
import { Card } from '~/components/Card'
import { Provider } from '~'

export const Cards = () => {
  return (
    <Provider>
      <Card
        title="Junior Eurovision 20222"
        description="Updated 30 minutes ago"
      ></Card>
    </Provider>
  )
}
