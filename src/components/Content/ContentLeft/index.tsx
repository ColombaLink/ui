import { useClient, useData } from '@based/react'
import React, { FC } from 'react'
import { Menu, Text, useSchemaTypes } from '~'

export const ContentLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  // const client = useClient()
  const { data: views, loading } = useData('basedObserveViews')

  if (loading) return <>...</>

  // client.call('basedSetViews', {
  //   default: [
  //     {
  //       id: 0,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22youzitype%22%7D%5D',
  //       label: 'YouziType',
  //     },
  //     {
  //       id: 1,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22user%22%7D%5D',
  //       label: 'user',
  //     },
  //     {
  //       id: 2,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22girl%22%7D%5D',
  //       label: 'Girl',
  //     },
  //     {
  //       id: 3,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22thing%22%7D%5D',
  //       label: 'thing',
  //     },
  //     {
  //       id: 4,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22file%22%7D%5D',
  //       label: 'File',
  //     },
  //     {
  //       id: 5,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22boy%22%7D%5D',
  //       label: 'Boy',
  //     },
  //     {
  //       id: 6,
  //       query:
  //         'filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22yvestypenew%22%7D%5D',
  //       label: 'yvesTypeNew',
  //     },
  //   ],
  // })

  return (
    <Menu
      prefix={prefix}
      collapse
      style={{ paddingTop: 24, minWidth: 234 }}
      header={
        <Text size="18px" weight="700" style={{ marginBottom: 18 }}>
          Content
        </Text>
      }
      data={{
        'Default Views': views.default?.map(({ id, query, label }) => {
          return {
            label,
            href: `/${id}?${query}`,
          }
        }),
      }}
    />
  )
}
