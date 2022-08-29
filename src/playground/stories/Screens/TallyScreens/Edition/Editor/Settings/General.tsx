import React from 'react'
import {
  Input,
  Text,
  Button,
  Checkbox,
  Separator,
  Label,
  Select,
  Callout,
  Toggle,
  Spacer,
} from '~'

export const General = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ minWidth: 100 }}>Alias</Text>
        <Input placeholder="Enter a friendly url" />
        <Button color="lightpurple">Apply</Button>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ minWidth: 100 }}>Title</Text>
        <Input placeholder="Enter a title for the webpage" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ minWidth: 100 }}>Description</Text>
        <Input placeholder="Enter a description for the webpage" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ minWidth: 100 }}>Logo link</Text>
        <Input placeholder="Enter a logo link" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Text style={{ minWidth: 100 }}>Redirect url</Text>
        <Input placeholder="Enter a url(temporarily) redirect to" />
        <Checkbox description="Enable" />
      </div>
      <Separator />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label label="Default language" description="Select default language" />
        <Select
          style={{ maxWidth: 200 }}
          options={['English', 'Dutch']}
          onChange={() => {}}
        />
      </div>
      <Spacer />

      <Callout color="grey" label="Enable experimental tracking">
        <Toggle style={{ position: 'absolute', right: 16, top: 14 }} />
      </Callout>

      <Callout
        color="grey"
        label="Single vote per show"
        description="Only allow single vote per show"
      >
        <Toggle style={{ position: 'absolute', right: 16, top: 28 }} />
      </Callout>

      <Callout
        color="grey"
        label="Allow multiple interactions"
        description="Allow your audience to submit multiple times"
      >
        <Toggle style={{ position: 'absolute', right: 16, top: 28 }} />
      </Callout>

      <Callout
        color="grey"
        label="Require email verification for submissions"
        description="Require your audience to verify their vote using their email adress"
      >
        <Toggle style={{ position: 'absolute', right: 16, top: 28 }} />
      </Callout>
    </div>
  )
}
