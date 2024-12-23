
import ComponentViewer from '../ComponentViewer'

export const useContextMenu = () => {
  return (
    <ComponentViewer
      title="useContextMenu"
      examples={[
        {
          code: `import { 
  useDialog, 
  ScheduleIcon, 
  useContextMenu, 
  Button, 
  MoreIcon,
  ContextMenu, 
  ContextItem, 
  ContextDivider 
} from '@based/ui'
            
const SimpleMenu = () => {
  const dialog = useDialog()
  return (
    <>
      <ContextItem
        onClick={() => {
          dialog.open(<Button>Yes</Button>)
        }}
      >
        Open dialog
      </ContextItem>
      <ContextItem inset>Do something else</ContextItem>
      <ContextItem
        onClick={() => {
          alert('close it')
        }}
        icon={ScheduleIcon}
        iconRight={() => {
          return (
            <MoreIcon
              onClick={() => {
                alert('snapje')
              }}
            />
          )
        }}
      >
        Flap
      </ContextItem>
    </>
  )
}

const DoubleOverlayMenu = () => {
  return (
    <>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'left', offset: { x: 20, y: 10 } }
        )}
      >
        yes + offset
      </ContextItem>
      <ContextItem
        iconRight={ScheduleIcon}
        onClick={useContextMenu(LargeMenu, {}, { position: 'left' })}
      >
        Click me!
      </ContextItem>
    </>
  )
}

const LargeMenu = () => {
  const a = []
  for (let i = 0; i < 100; i++) {
    a.push(i)
  }
  return (
    <>
      {a.map((v, i) => {
        return (
          <ContextItem inset key={i}>
            {i} Do something
          </ContextItem>
        )
      })}
    </>
  )
}

<Button
  style={{ marginBottom: 24 }}
  onClick={useContextMenu(DoubleOverlayMenu, { flap: 1 })}
>
  Double Menu
</Button>
          `,
        },
      ]}
    />
  )
}
