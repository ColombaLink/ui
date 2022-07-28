import React from 'react'
import { TallySideBar } from '../../TallyComponents/TallySideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Page,
  Text,
  useDialog,
  Dialog,
  Input,
  UploadIcon,
  RadioButton,
  Table,
} from '~'

export const TallyShows = () => {
  const dialog = useDialog()

  const addShowHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }
  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ Shows: '/' }} logo={<></>} onFilter={() => {}}>
        <Button icon={AddIcon} ghost color="accent" onClick={addShowHandler}>
          Add show
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>
          <Table
            data={[
              {
                Name: 'Star Trek',
                Editions: '21',
                'Last Modified': '12 days ago',
              },
              {
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

export const AddShowDialog = () => {
  return (
    <Dialog label="Create a new show">
      <Input space label="Name of show" placeholder="Show name" />
      <Input space label="Add show image" icon={UploadIcon} />
      <RadioButton
        label="Organisations"
        data={[
          'Saulx',
          'Twister Interactive',
          'Digame',
          'Sport1',
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
