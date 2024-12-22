import { FC } from 'react'
import {
  Badge,
  LoadingIcon,
  WarningIcon,
  CheckIcon,
  Row,
  Color,
  Style,
} from '~'

export const EnvMachinesStatus: FC<{
  running?: number
  deploying?: number
  unreachable?: number
  goodColor?: Color
  removing?: number
  resizing?: number
  style?: Style
  count?: number
  type: 'service' | 'machine' | 'instance'
}> = ({
  running,
  type,
  deploying,
  removing,
  unreachable,
  goodColor = 'green',
  count,
  style,
  resizing,
}) => {
    const noProblems = !unreachable

    return (
      <Row style={style}>
        {count !== undefined ? (
          <Badge style={{ marginRight: 12 }} color="accent">
            {count} {type}
            {count !== 1 ? 's' : ''}
          </Badge>
        ) : null}
        {running ? (
          <Badge
            iconRight={noProblems ? CheckIcon : null}
            style={{ marginRight: 12 }}
            color={noProblems ? goodColor : 'text'}
          >
            {running} {type}
            {running > 1 ? 's' : ''} running
          </Badge>
        ) : null}
        {deploying ? (
          <Badge style={{ marginRight: 12 }} color="text" icon={LoadingIcon}>
            {deploying} {type}
            {deploying > 1 ? 's' : ''} deploying
          </Badge>
        ) : null}
        {unreachable ? (
          <Badge style={{ marginRight: 12 }} color="red" icon={WarningIcon}>
            {unreachable} {type}
            {unreachable > 1 ? 's' : ''} failing
          </Badge>
        ) : null}
        {removing ? (
          <Badge style={{ marginRight: 12 }} color="red" icon={LoadingIcon}>
            {removing} {type}
            {removing > 1 ? 's' : ''} removing
          </Badge>
        ) : null}
        {resizing ? (
          <Badge style={{ marginRight: 12 }} color="accent" icon={LoadingIcon}>
            {resizing} {type}
            {resizing > 1 ? 's' : ''} resizing
          </Badge>
        ) : null}
      </Row>
    )
  }
