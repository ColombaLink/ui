import React, { useReducer } from 'react'
import { Page, Flow, Toggle, Button, useOverlay } from '~'
import { EditionSidebar } from '../../EditionSidebar'
import { EditorTopBar } from '../../EditorTopBar'
import { wait } from '@saulx/utils'

export const Content = () => {
  const [, update] = useReducer((x) => x + 1, 1)
  const fd = [...listData]

  return (
    <div style={{ position: 'relative', paddingLeft: 48 }}>
      <EditionSidebar />
      <EditorTopBar />

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>
          <div style={{ height: 500, maxWidth: 676, margin: '0 auto' }}>
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
                  items: listData,
                },
              ]}
              paddingLeft={16}
              paddingTop={30}
              paddingBottom={30}
              paddingRight={16}
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
                  return <Toggle text="Edit" />
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
        </Page>
      </div>
    </div>
  )
}

const randomDate = () => {
  const start = new Date()
  const end = new Date()
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime()
}

const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    id: i,
    text: 'Item ' + i,
    longtext: 'test',
    flurpen: 'CheckCircleIcon',
    // img: i !== 3 ? profilePic : '',
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
