import React from 'react'
import { Grid } from '~/components/Grid/Grid'
import { Card } from '~/components/Card'
import { Thumbnail } from '~/components/Thumbnail'
import { StackIcon, CalendarIcon } from '~/icons'
import { Container } from '~/components/Container'
import { Text } from '~/components/Text'
import { MasonryGrid } from '~/components/MasonryGrid/MasonryGrid'
import { Input } from '~/components/Input'
import { Callout } from '~/components/Callout'

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
          {'Gridprop => columnDistribution'}
        </Text>

        <Grid
          space
          columnDistribution="2fr 2fr 8fr"
          rowGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Callout outline>2fr</Callout>
          <Callout outline>2fr</Callout>
          <Callout outline>8fr</Callout>
        </Grid>
        <Grid
          space
          columnDistribution="4 3 2 1"
          rowGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Callout outline>4</Callout>
          <Callout outline>3</Callout>
          <Callout outline>2</Callout>
          <Callout outline>1</Callout>
        </Grid>
        <Grid
          space
          columnDistribution="200px 100px 300px"
          rowGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Callout outline>200px</Callout>
          <Callout outline>100px</Callout>
          <Callout outline>300px</Callout>
        </Grid>
        <Grid
          space
          columnDistribution="2 150px 4fr 1fr"
          rowGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Callout outline>2</Callout>
          <Callout outline>150px</Callout>
          <Callout outline>4fr</Callout>
          <Callout outline>1fr</Callout>
        </Grid>
        <Grid
          space
          columnDistribution="8 4 4"
          rowGap={20}
          columnGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Input placeholder="put some text" />
          <Input placeholder="Min" />
          <Input placeholder="Max" />
        </Grid>
        <Grid
          space
          columnDistribution="2 6 2"
          rowGap={20}
          columnGap={20}
          wrap
          style={{ width: 900 }}
        >
          <Input placeholder="put some text" />
          <Input placeholder="Min" />
          <Input placeholder="Max" />
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
