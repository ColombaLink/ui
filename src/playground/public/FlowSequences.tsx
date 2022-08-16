import React, { useReducer } from 'react'
import { Flow } from '~/components/Flow'
import { wait } from '@saulx/utils'
import { Button } from '~/components/Button'
import { useOverlay } from '~/hooks'
import { color, renderOrCreateElement } from '~/utils'
import { Toggler } from '~/components/Toggler'
import { SettingsIcon, CheckCircleIcon } from '~/icons'

export const FlowSequences = () => {
  const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'

  const randomDate = () => {
    const start = new Date()
    const end = new Date()
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).getTime()
  }

  const listData = []
  for (let i = 0; i < 50; i++) {
    listData.push({
      id: i,
      text: 'Item ' + i,
      longtext: 'test',
      flurpen: 'CheckCircleIcon',
      img: i !== 3 ? profilePic : '',
      created: randomDate(),
    })
  }

  const modalsnurp = (update) => {
    return useOverlay(
      ({ data }) => {
        console.info(data)
        return (
          <div style={{ width: 400, height: 200, padding: 30 }}>
            <Button
              onClick={() => {
                data.text = 'blah'
                update()
              }}
            >
              MAKE UPDATE
            </Button>
          </div>
        )
      },
      {
        header: ({ data }) => {
          return {
            title: data.text,
          }
        },
      }
    )
  }

  const [, update] = useReducer((x) => x + 1, 1)
  const fd = [...listData]

  return (
    <div style={{ height: 676 }}>
      <Flow
        color="accent"
        defaultIsExpanded
        expandable
        itemProps={{
          id: ['id'],
          items: {
            props: {
              title: { path: ['text'] },
              icon: { path: ['flurpen'] },
              id: ['id'],
            },
            path: ['items'],
          },
        }}
        items={[
          {
            title: 'my seq0',
            id: 0,
            items: [],
          },
          {
            title: 'my seq1',
            id: 1,
            items: [
              {
                // flurpen: {
                //   name: 'CircleCheckIcon',
                //   color: color('accent'),
                // },
                text: 'yesh',
                id: 1,
                flurpen: 'StackIcon',
              },
            ],
          },
          {
            title: 'my seq2',
            id: 2,
            items: fd.slice(0, 10),
          },
          {
            title: 'my seq3',
            id: 3,
            items: fd.slice(10),
          },
        ]}
        paddingLeft={200}
        paddingTop={30}
        paddingBottom={30}
        paddingRight={200}
        onDrop={async (e, data) => {
          if (data.data) {
            console.info(data)
            data.data.sort((a, b) => (a.index > b.index ? 1 : -1))
            for (const d of data.data) {
              listData.splice(
                listData.findIndex((x) => d.data.id === x.id),
                1
              )
            }
            await wait(1e3)
            update()
          }
        }}
        header={{
          outline: true,
          onEditTitle: () => {},
          children: () => {
            // yes
            return (
              <>
                <Toggler text="Edit" />
              </>
            )
          },
        }}
        onDropSequence={async (e, data) => {
          console.info('SEQ AREA', data)
          await wait(1e3)
        }}
        footer={{
          outline: true,
          icon: 'SettingsIcon',
          label: 'New sequence',
          onClick: async (e, data) => {
            await wait(1e3)
          },
        }}
        stepFooter={{
          label: 'New step',
          onClick: async (e, data) => {
            listData.unshift({
              id: listData.length,
              text: 'gruken ' + listData.length,
            })
            await wait(1e3)
            update()
          },
        }}
        onClick={modalsnurp(update)}
      >
        {({ isHover, data, items }) => {
          return (
            <div
              style={{
                width: 50,
                height: 24,
                position: 'relative',
              }}
            >
              {data.data.id === 2 ? (
                <div
                  style={{
                    position: 'absolute',
                    left: 26.5 + 25,
                    top: 0,
                  }}
                ></div>
              ) : null}
            </div>
          )
        }}
      </Flow>
    </div>
  )
}
