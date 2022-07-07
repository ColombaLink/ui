import React from 'react'
import { Grid } from '~/components/Grid/Grid'
import { Card } from '~/components/Card'
import { Thumbnail } from '~/components/Thumbnail'
import { StackIcon, CalendarIcon } from '~/icons'
import { Container } from '~/components/Container'
import { Text } from '~/components/Text'
import { MasonryGrid } from '~/components/MasonryGrid/MasonryGrid'

export const Grids = () => {
  return (
    <>
      <Container wrap space>
        <Text space weight={600}>
          Normal Grid
        </Text>
        <Grid rowGap={20} columnGap={20} columns={3} wrap>
          <Card
            small
            title="Card small"
            description="With description and topLeft"
            topLeft={<Thumbnail color="PurpleDark" icon={StackIcon} />}
          ></Card>

          <Card
            small
            title="Date time"
            description="Date with time"
            topLeft={<Thumbnail color="Yellow" icon={CalendarIcon} />}
          ></Card>
          <Card
            small
            title="Date time"
            description="Date with time"
            topLeft={<Thumbnail color="Pink" icon={CalendarIcon} />}
          ></Card>
          <Card
            small
            title="Date time"
            description="Date with time"
            topLeft={<Thumbnail color="Green" icon={CalendarIcon} />}
          ></Card>
          <Card
            small
            title="Date time"
            description="Date with time"
            topLeft={<Thumbnail color="Red" icon={CalendarIcon} />}
          ></Card>
        </Grid>
      </Container>

      <Container wrap space>
        <Text space weight={600}>
          Masonry Grid
        </Text>
        <MasonryGrid columns={3}>
          <div>
            <img src="https://picsum.photos/300/300" />
          </div>

          <div>
            <img src="https://picsum.photos/400/300" />
          </div>
          <div>
            <img src="https://picsum.photos/500/300" />
          </div>
          <div>
            <img src="https://picsum.photos/600/900" />
          </div>
          <div>
            <img src="https://picsum.photos/300/300" />
          </div>
          <div>
            <img src="https://picsum.photos/400/300" />
          </div>
          <div>
            <img src="https://picsum.photos/600/300" />
          </div>
        </MasonryGrid>
      </Container>
    </>
  )
}
