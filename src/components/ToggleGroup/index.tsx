import React, { FC, useState, CSSProperties, ReactNode } from 'react'
import { styled } from 'inlines'
import { color, spaceToPx } from '~/utils'
import { Space } from '~/types'

type ToggleGroupProps = {
  data?: Array<string> | Array<ReactNode>
  space?: Space
  style?: CSSProperties
}

const StyledToggleTab = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '4px',
})

export const ToggleGroup: FC<ToggleGroupProps> = ({
  data,
  space,
  style,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <styled.div
      style={{
        display: 'flex',
        backgroundColor: color('border'),
        borderRadius: '4px',
        padding: '2px',
        width: 'fit-content',
        height: '32px',
        marginBottom: spaceToPx(space),
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {data?.map((item, idx) => (
        <StyledToggleTab
          key={idx}
          onClick={() => {
            setActiveTab(idx)
          }}
          style={{
            backgroundColor:
              activeTab === idx ? color('background') : 'transparent',
          }}
        >
          {item}
        </StyledToggleTab>
      ))}
    </styled.div>
  )
}
