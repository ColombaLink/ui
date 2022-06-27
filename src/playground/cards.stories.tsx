import React from 'react'
import { Card } from '~/components/Card'
import { Provider } from '~'
import { Avatar } from '~/components/Avatar'
import { Badge } from '~/components/Badge'
import { DotIcon, BasedIcon, CopyIcon, MoreIcon } from '~'
import { color } from '~/utils'
import { Text } from '~/components/Text'

export const Cards = () => {
  return (
    <Provider>
      <Card
        title="Junior Eurovision 20222"
        description="Updated 30 minutes ago"
        iconTopLeft={
          <Avatar
            icon={<BasedIcon color="AccentBrightpurple" />}
            backgroundColor="AccentBrightpurpleLight"
            style={{ marginRight: 12 }}
          />
        }
        iconTopRight={<MoreIcon />}
        badgeBottomLeft={
          <Badge
            iconLeft={<CopyIcon style={{ marginRight: 10 }} />}
            boxed
            style={{
              backgroundColor: color('ActionLight'),
            }}
          >
            <Text size="12px">main</Text>
          </Badge>
        }
        badgeBottomRight={
          <Badge
            outline
            iconLeft={
              <DotIcon
                color="AccentGreen"
                size={10}
                style={{ marginRight: 10 }}
              />
            }
          >
            Healthy
          </Badge>
        }
        space
      ></Card>

      <Card
        title="Tally "
        description="Updated 6 days ago"
        iconTopLeft={
          <Avatar
            icon={<BasedIcon color="AccentGreen" />}
            backgroundColor="AccentGreenLight"
            style={{ marginRight: 12 }}
          />
        }
        iconTopRight={<MoreIcon />}
        badgeBottomLeft={
          <Badge
            iconLeft={<CopyIcon style={{ marginRight: 10 }} />}
            boxed
            style={{
              backgroundColor: color('ActionLight'),
            }}
          >
            <Text size="12px">main</Text>
          </Badge>
        }
        badgeBottomRight={
          <Badge
            outline
            iconLeft={
              <DotIcon
                color="AccentDarkpurple"
                size={10}
                style={{ marginRight: 10 }}
              />
            }
          >
            Deploying
          </Badge>
        }
        space
      ></Card>
    </Provider>
  )
}
