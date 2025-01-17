
import ComponentViewer from '../ComponentViewer'

const code = ` import { Flow, Button, Toggle } from '@based/ui'
import { wait } from '@saulx/utils'

const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'


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
              <Toggle baseColor="red" text="Edit" />
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
        onClick: async () => {
          await wait(1e3)
        },
      }}
      stepFooter={{
        label: 'New step',
        onClick: async () => {
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
              />
            ) : null}
          </div>
        )
      }}
    </Flow>
  </div>
)`

export const Flow = () => {
  return (
    <ComponentViewer
      title="Flow"
      examples={[
        {
          code,
        },
      ]}
    />
  )
}
