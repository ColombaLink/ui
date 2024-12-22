import { FC, useState, CSSProperties, ReactNode } from 'react'
import { styled } from 'inlines'
import { color } from '~/utils'

type ToggleGroupProps = {
  data?: Array<string> | Array<ReactNode>
  style?: CSSProperties
  onChange?: (value: number) => void
}

const StyledToggleTab = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '4px',
  fontSize: 14,
})

export const ToggleGroup: FC<ToggleGroupProps> = ({
  data,
  style,
  onChange,
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
            onChange && onChange(idx)
          }}
          style={{
            backgroundColor:
              activeTab === idx ? color('background') : 'transparent',
            fontWeight: activeTab === idx ? '500' : '400',
          }}
        >
          {item}
        </StyledToggleTab>
      ))}
    </styled.div>
  )
}
