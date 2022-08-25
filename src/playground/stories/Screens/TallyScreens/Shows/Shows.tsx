import React from 'react'

import { SideBar } from '../TallyComponents/SideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Page,
  useDialog,
  Dialog,
  Input,
  UploadIcon,
  BasedIcon,
  RadioButton,
  MoreIcon,
  Table,
  Link,
  TargetIcon,
} from '~'

export const Shows = () => {
  const dialog = useDialog()

  const addShowHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', paddingLeft: 48 }}>
      <SideBar />

      <Topbar
        data={{ Shows: '/' }}
        noLogo
        icons={['ScreenIcon']}
        onFilter={(value) => console.log(value)}
      >
        <Button icon={AddIcon} ghost color="accent" onClick={addShowHandler}>
          Add show
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>
          <Table
            data={[
              {
                '': <Avatar label="Tally" icon={BasedIcon} color="green" />,
                Name: "Tally's show",
                Editions: '21',
                'Last Modified': '12 days ago',
                // 'Temp button': (
                //   <Link href="?story=TallyEdition" style={{ color: '#BADA55' }}>
                //     Go to Show
                //   </Link>
                // ),
              },
              {
                '': <Avatar label="Tally" icon={TargetIcon} color="red" />,
                Name: 'show 2',
                Editions: '43',
                'Last Modified': '1 month ago',
              },
            ]}
          />
        </Page>
      </div>
    </div>
  )
}

const AddShowDialog = () => {
  return (
    <Dialog label="Create a new show">
      <Input space label="Name of show" placeholder="Show name" />
      <Input
        space
        label="Add show image"
        icon={UploadIcon}
        placeholder="Upload file"
      />
      <RadioButton
        label="Organisations"
        data={[
          'Saulx',
          'Twister Interactive',
          'Digame',
          'Sport 1',
          'ARD',
          'SRF',
        ]}
      />
      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add Show</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}
