import React from 'react'
import { AddIcon, Button, Text } from '~'
import { styled } from 'inlines'

export const Buttons = ({ icon }) => {
  const colors = ['Primary', 'Action', 'Error']
  const loadClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1e3))
  }
  const errorClick = async () => {
    await loadClick()
    throw Error('error')
  }
  return (
    <>
      {colors.map((color) => {
        const states = [null, 'disabled']
        return (
          <div key={color} style={{ marginBottom: 24 }}>
            <Text weight={600}>{color}</Text>
            {states.map((state) => {
              const disabled = state === 'disabled'
              const error = color === 'Error'
              const action = color === 'Action'
              return (
                <styled.div
                  key={state}
                  style={{
                    display: 'flex',
                    margin: '0 -8px',
                    alignItems: 'center',
                    '& > *': {
                      margin: '8px',
                    },
                  }}
                >
                  <Text style={{ width: 100 }}>{state}</Text>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    onClick={loadClick}
                  >
                    {color}
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    light
                    onClick={errorClick}
                  >
                    {color} Light
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    ghost
                  >
                    {color} Ghost
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    outline
                  >
                    {color} Outline
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    outline
                    light
                  >
                    {color} Outline Light
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
                    action={action}
                    error={error}
                    outline
                    light
                    loading
                  >
                    {color} Outline Light
                  </Button>
                </styled.div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export const ButtonsWithIcons = () => <Buttons icon={AddIcon} />
