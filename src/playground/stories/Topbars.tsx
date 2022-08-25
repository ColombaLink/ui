import React from 'react'
import { Topbar } from '~/components/Topbar'
import ComponentViewer from '../ComponentViewer'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import { Thumbnail } from '~/components/Thumbnail'
import { StackIcon } from '~/icons'

export const Topbars = () => {
  return (
    <div>
      <ComponentViewer
        component={Topbar}
        propsName="TopbarProps"
        examples={[
          {
            props: {
              data: { Home: '/topbars', About: '/about' },
              icons: ['ScreenIcon', 'StackIcon'],
            },
          },
          {
            props: {
              breadcrumbs: (
                <Breadcrumbs
                  data={{
                    Based: '/breadcrumb',
                    Topbar: '/Snurky',
                    'Based ui': '/BasedUI',
                  }}
                />
              ),
              onFilter: (value) => console.log(value),
              onProfile: () => console.log('profile'),
            },
          },
          {
            props: {
              logo: <Thumbnail icon={StackIcon} color="green" />,
              data: { Home: '/topbars', About: '/about' },
            },
          },
        ]}
      />
    </div>
  )
}
