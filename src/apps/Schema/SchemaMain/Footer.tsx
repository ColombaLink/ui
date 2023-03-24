import React, { FC } from 'react'
import { useContextState, Breadcrumbs } from '~'
import { border } from '~/utils'

export const Footer: FC<{ name: string }> = ({ name }) => {
  const [field, setField] = useContextState<string[]>('field', [])

  if (field.length === 0) {
    return null
  }

  const data = field.reduce(
    (data, key) => {
      data[key] = key
      return data
    },
    {
      name,
    }
  )

  return (
    <div
      style={{
        borderTop: border(1),
        padding: '16px 32px ',
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Breadcrumbs
        active={field[field.length - 1]}
        onChange={(key) => setField(field.slice(0, field.indexOf(key) + 1))}
        data={data}
      />
    </div>
  )
}
