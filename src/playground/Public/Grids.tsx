import React from 'react'
import { Grid } from '~/components/Grid/Grid'
import { Card } from '~/components/Card'
import { Thumbnail } from '~/components/Thumbnail'
import { StackIcon, CalendarIcon } from '~/icons'
import { Container } from '~/components/Container'
import { Text } from '~/components/Text'

export const Grids = () => {
  return (
    <>
      <Container wrap>
        <Text space weight={600}>
          Bonjour
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
    </>
  )
}
