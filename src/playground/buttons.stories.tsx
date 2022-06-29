import React from 'react'
import { AddIcon, Button, Text } from '~'
import { styled } from 'inlines'

export const Buttons = ({ icon }) => {
  const colors = ['Primary']
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
                    onClick={loadClick}
                  >
                    {color}
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    light
                    onClick={errorClick}
                  >
                    {color} Light
                  </Button>
                  <Button iconLeft={icon} disabled={disabled} ghost>
                    {color} Ghost
                  </Button>
                  <Button iconLeft={icon} disabled={disabled} outline>
                    {color} Outline
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
                    outline
                    light
                  >
                    {color} Outline Light
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
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
      <div>
        <Button
          action
          space
          textAlign="center"
          style={{ width: 250, justifyContent: 'center' }}
        >
          textAlign 'center'
        </Button>
        <Button
          textAlign="right"
          space
          style={{ width: 250, justifyContent: 'center' }}
        >
          textAlign 'right'
        </Button>
        <Button error space style={{ width: 250, justifyContent: 'center' }}>
          Custom width
        </Button>
      </div>
    </>
  )
}

export const ButtonsWithIcons = () => <Buttons icon={AddIcon} />
