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
              gap: 10,
              children: (
                <>
                  <Card
                    label="Card small"
                    topLeft={<Thumbnail color="purple" icon={StackIcon} />}
                  />
                  <Card
                    label="Date time"
                    topLeft={<Thumbnail color="yellow" icon={CalendarIcon} />}
                  />
                  <Card
                    label="Date time"
                    topLeft={<Thumbnail color="green" icon={CalendarIcon} />}
                  />
                  <Card
                    label="Date time"
                    topLeft={<Thumbnail color="red" icon={CalendarIcon} />}
                  />
                  <Card
                    label="Date time"
                    topLeft={<Thumbnail color="accent" icon={CalendarIcon} />}
                  />
                  <Card
                    label="Date time"
                    topLeft={
                      <Thumbnail color="lightyellow" icon={CalendarIcon} />
                    }
                  />
                </>
              ),
            },
          },
          {
            props: {
              gap: 10,
              itemWidth: 100,
              children: (
                <>
                  <Callout outline style={{ minWidth: 300 }}>
                    300 custom width
                  </Callout>
                  <Callout outline>100</Callout>
                  <Callout outline>100</Callout>
                </>
              ),
            },
          },
          {
            props: {
              gap: 12,
              itemWidth: 150,
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
