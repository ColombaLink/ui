// @ts-nocheck
import React from 'react'
import { color } from '~/utils'
import { styled } from 'inlines'
import { Checkbox } from '../Checkbox'
import { EditIcon } from '~/icons'
import { ACTIONS_WIDTH, ITEM_HEIGHT } from './constants'
import { isDate, toDateString } from '~/utils/date'
import { Cell } from './_Cell'

const Edit = styled(EditIcon, {
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
})

const isImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/

export const Row = ({
  data: { data, fields, longest, onClick },
  index,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,

        ...style,
      }}
    >
      <div
        style={{
          width: ACTIONS_WIDTH,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Checkbox style={{ marginLeft: 24 }} />
        <Edit style={{ marginLeft: 20 }} color="accent" />
      </div>
      {fields.map((field, i) => {
        const value = data[index]?.[field]

        if (isImage.test(value)) {
          return (
            <Cell key={field} longestString={longest[field]} index={i}>
              <div
                style={{
                  width: ITEM_HEIGHT,
                  height: ITEM_HEIGHT,
                  backgroundImage: `url(${value})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Cell>
          )
        }

        return (
          <Cell
            key={field}
            longestString={longest[field]}
            index={i}
            onClick={() => onClick(field, value, data[index])}
          >
            {isDate(value) ? toDateString(value) : value}
          </Cell>
        )
      })}
    </div>
  )
}
