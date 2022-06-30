import React from 'react'
import { Provider } from '~'
import { Grid } from '~/components/Grid/Grid'
import { Card } from '~/components/Card'

import { Avatar } from '~/components/Avatar'
import { Badge } from '~/components/Badge'
import { Container } from '~/components/Container'
import { Text } from '~/components/Text'
import {
  DotIcon,
  BasedIcon,
  CopyIcon,
  MoreIcon,
  CalendarIcon,
  StackIcon,
} from '~'

export const GridOverview = () => {
  return (
    <Provider>
      <Text space>Cards in a Grid (gap 16) (width 980px)</Text>
      <Grid gap={16} width={980}>
        <Card
          title="Junior Eurovision 2022"
          description="Updated 30 minutes ago"
          topLeft={<Avatar icon={BasedIcon} color="PurpleBright" />}
          topRight={<MoreIcon />}
          bottomLeft={
            <Badge iconLeft={CopyIcon({ size: 14 })} boxed light>
              main
            </Badge>
          }
          bottomRight={
            <Badge outline ghost iconLeft={<DotIcon color="Green" size={10} />}>
              Healthy
            </Badge>
          }
        ></Card>
        <Card
          title="Junior Eurovision 2022"
          description="Updated 30 minutes ago"
          topLeft={<Avatar icon={BasedIcon} color="BlueSailor" />}
          topRight={<MoreIcon />}
          bottomLeft={
            <Badge iconLeft={CopyIcon({ size: 14 })} boxed light>
              main
            </Badge>
          }
          bottomRight={
            <Badge
              outline
              ghost
              iconLeft={<DotIcon color="Mustard" size={10} />}
            >
              Healthy
            </Badge>
          }
        ></Card>
        <Card
          title="Junior Eurovision 2022"
          description="Updated 30 minutes ago"
          topLeft={<Avatar icon={BasedIcon} color="Mustard" />}
          topRight={<MoreIcon />}
          bottomLeft={
            <Badge iconLeft={CopyIcon({ size: 14 })} boxed light>
              main
            </Badge>
          }
          bottomRight={
            <Badge
              outline
              ghost
              iconLeft={<DotIcon color="Orange" size={10} />}
            >
              Healthy
            </Badge>
          }
        ></Card>
      </Grid>
    </Provider>
  )
}
