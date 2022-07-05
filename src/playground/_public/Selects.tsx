import React from 'react'
import { Provider, AddIcon } from '~'
import { MultiSelect, Select } from '~/components/Select'

export const Selects = () => {
  return (
    <Provider>
      <Select
        style={{
          marginBottom: 32,
        }}
        onChange={(value) => {
          // log.global.debug('Select change: ', { value })
        }}
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkles', label: 'Snorkles' },
        ]}
      />
      <Select
        label="Env"
        style={{
          marginBottom: 32,
        }}
        onChange={(value) => {
          // log.global.debug('Select change: ', { value })
        }}
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkles', label: 'Snorkles' },
        ]}
      />

      <Select
        label="Env (add)"
        style={{
          marginBottom: 32,
        }}
        onChange={(value) => {
          // log.global.debug('Select change: ', { value })
        }}
        value="flurpy"
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkles', label: 'Snorkles' },
          {
            label: 'Add item',
            divider: true,
            icon: AddIcon,
            onSelect: () => {
              // eslint-disable-next-line
              alert('Add icon')
            },
          },
        ]}
      />

      <Select
        style={{
          marginBottom: 32,
        }}
        overlay={{
          width: 300,
          position: 'right',
          variant: 'detached',
        }}
        placeholder="Select a thing"
        onChange={(value) => {
          // log.global.debug('Select change: ', { value })
        }}
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkles', label: 'Snorkles' },
        ]}
      />

      <Select
        style={{
          marginBottom: 32,
        }}
        overlay={{
          variant: 'detached',
        }}
        placeholder="Select a thing"
        onChange={(value) => {
          // log.global.debug('Select change: ', { value })
        }}
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkles', label: 'Snorkles' },
        ]}
      />

      <MultiSelect
        style={{ marginBottom: 32 }}
        filterable
        placeholder="Select many things"
        onChange={(value) => {
          console.info('Select change: ', { value })
        }}
        values={['flurpy', 'snark', 'snorkels']}
        options={[
          { value: 'flurpy', label: 'Flurpy' },
          { value: 'snark', label: 'Snark' },
          { value: 'snorkels', label: 'Snorkles' },
          { value: 'gurken', label: 'Gurken' },
          { value: 'bedroloeloe', label: 'Bedroloeloe' },
          { value: 'kakkie', label: 'Kakkie' },
          { value: 'snak', label: 'Snak' },
        ]}
      />
    </Provider>
  )
}
