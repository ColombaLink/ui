
import { Thumbnail as ThumbnailComponent } from '~/components/Thumbnail'
import { AttachmentIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Thumbnail = () => {
  return (
    <ComponentViewer
      component={ThumbnailComponent}
      propsName="ThumbnailProps"
      examples={[
        {
          props: {
            size: 32,
            label: 'Snurpy',
          },
        },
        {
          props: {
            size: 40,
            color: 'green',
            label: 'Apples',
            counter: 5,
          },
        },
        {
          props: {
            size: 40,
            color: 'pink',
            icon: <AttachmentIcon />,
          },
        },
        {
          props: {
            size: 64,
            color: 'yellow',
            img: 'https://robohash.org/ZCP.png?set=set1&size=150x150',
          },
        },
      ]}
    />
  )
}
