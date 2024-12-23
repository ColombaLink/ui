
import { Avatar as AvatarComponent } from '~/components/Avatar'
import { BasedIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Avatar = () => {
  return (
    <ComponentViewer
      component={AvatarComponent}
      propsName="AvatarProps"
      examples={[
        {
          props: {
            size: 32,
            label: 'blah',
          },
        },
        {
          props: {
            size: 40,
            color: 'green',
            label: 'Yo',
          },
        },
        {
          props: {
            icon: <BasedIcon />,
            size: 40,
            color: 'red',
          },
        },
        {
          props: {
            size: 64,
            label: 'Hello',
            color: 'red',
            img: 'https://robohash.org/JBS.png?set=set2&size=150x150',
          },
        },
      ]}
    />
  )
}
