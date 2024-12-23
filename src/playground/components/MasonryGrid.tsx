
import { MasonryGrid as MasonryGridC } from '../..'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { MasonryGrid } from '@based/ui'

<MasonryGrid>
  <div><img src="https://picsum.photos/300/300" /></div>
  <div><img src="https://picsum.photos/400/300" /></div>
  <div><img src="https://picsum.photos/500/300" /></div>
  <div><img src="https://picsum.photos/600/900" /></div>
  <div><img src="https://picsum.photos/300/300" /></div>
  <div><img src="https://picsum.photos/400/300" /></div>
  <div><img src="https://picsum.photos/600/300" /></div>
</MasonryGrid>`

export const MasonryGrid = () => {
  return (
    <ComponentViewer
      component={MasonryGridC}
      propsName="MasonryGridProps"
      examples={[
        {
          code: codeExample,
        },
      ]}
    />
  )
}
