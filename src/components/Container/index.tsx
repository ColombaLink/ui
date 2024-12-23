import { FC, ReactNode } from 'react'
import { color, renderOrCreateElement, RowSpaced, Row } from '~'
import { Style, styled } from 'inlines'

type ContainerProps = {
  children: ReactNode
  style?: Style
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
  bottomLeft?: FC | ReactNode
  bottomRight?: FC | ReactNode
  wrap?: boolean
  onClick?: (e: MouseEvent) => void
}

export const Container: FC<ContainerProps> = ({
  children,
  style,
  onClick,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  wrap,
  ...props
}) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        padding: 24,
        paddingBottom: bottomLeft || bottomRight ? 88 : 24,
        backgroundColor: color('background'),
        border: `1px solid ${color('border')}`,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        width: wrap ? 'fit-content' : '100%',
        marginBottom: '32px',
        ...style,
      }}
      {...props}
    >
      <RowSpaced
        style={{
          marginBottom: topLeft || topRight ? 24 : 0,
        }}
      >
        <Row style={{ gap: 16 }}>{renderOrCreateElement(topLeft)}</Row>
        <Row style={{ gap: 16 }}>{renderOrCreateElement(topRight)}</Row>
      </RowSpaced>
      {children}
      {(bottomLeft || bottomRight) && (
        <RowSpaced
          style={{
            minHeight: 68,
            borderTop: `1px solid ${color('border')}`,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: color('background2'),
          }}
        >
          <Row style={{ gap: 16 }}>{renderOrCreateElement(bottomLeft)}</Row>
          <Row style={{ gap: 16 }}>{renderOrCreateElement(bottomRight)}</Row>
        </RowSpaced>
      )}
    </styled.div>
  )
}
