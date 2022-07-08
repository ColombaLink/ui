import React from 'react'
import { Grid, Callout, Card, Thumbnail, StackIcon, CalendarIcon } from '../../'
import ComponentViewer from '../ComponentViewer'

export const Grids = () => {
  return (
    <>
      <ComponentViewer
        component={Grid}
        examples={[
          {
            props: {
              rowGap: 20,
              columnGap: 20,
              columns: 4,
              wrap: true,
              children: (
                <>
                  <Card
                    title="Card small"
                    topLeft={<Thumbnail color="PurpleDark" icon={StackIcon} />}
                  />
                  <Card
                    title="Date time"
                    topLeft={<Thumbnail color="Yellow" icon={CalendarIcon} />}
                  />
                  <Card
                    title="Date time"
                    topLeft={<Thumbnail color="Pink" icon={CalendarIcon} />}
                  />
                  <Card
                    title="Date time"
                    topLeft={<Thumbnail color="Green" icon={CalendarIcon} />}
                  />
                  <Card
                    title="Date time"
                    topLeft={<Thumbnail color="Yellow" icon={CalendarIcon} />}
                  />
                  <Card
                    title="Date time"
                    topLeft={<Thumbnail color="Pink" icon={CalendarIcon} />}
                  />
                </>
              ),
            },
          },
          {
            props: {
              rowGap: 20,
              columnDistribution: '2fr 2fr 8fr',
              wrap: true,
              children: (
                <>
                  <Callout outline>2fr</Callout>
                  <Callout outline>2fr</Callout>
                  <Callout outline>8fr</Callout>
                </>
              ),
            },
          },
          {
            props: {
              rowGap: 20,
              columnDistribution: '4 3 2 1',
              wrap: true,
              children: (
                <>
                  <Callout outline>4</Callout>
                  <Callout outline>3</Callout>
                  <Callout outline>2</Callout>
                  <Callout outline>1</Callout>
                </>
              ),
            },
          },
        ]}
      />
    </>
  )
}
