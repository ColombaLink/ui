import React from 'react'
import { AddIcon, LightModeIcon, DarkModeIcon, Button, Text } from '~'
import { styled } from 'inlines'
import wait from '~/utils/wait'

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
      <Button>Primary</Button>
      <br />
      <Button light>Light</Button>
      <br />
      <Button ghost>Ghost</Button>
      <br />
      <Button
        onClick={async () => {
          await wait(1000)
          throw new Error('error loading async')
        }}
      >
        Async button
      </Button>
      <br />
      <Button loading>Loading</Button>

      <br />
      <Button color="Red">Red</Button>
      <br />
      <Button color="Red" light>
        Red light
      </Button>
      <br />
      <Button color="Green" light outline>
        Outline light
      </Button>
      <br />
      <Button color="Red" light outline foregroundColor="Red">
        Outline light color Red ForegroundColor Red
      </Button>
      <br />
      <Button
        backgroundColor="Transparent"
        hoverColor="Transparent"
        color="PurpleDark"
        foregroundColor="PurpleDark"
        outline
      >
        Transparent bg outline
      </Button>
      <br />
      <Button color="Orange" iconLeft={LightModeIcon}>
        Orange
      </Button>
      <br />
      <Button color="Greydark" iconRight={DarkModeIcon}>
        Grey Dark
      </Button>
      <br />
      <Button
        outline
        //  color="Greydark"
        outlineColor="Teal"
        backgroundColor="MustardAccent"
        foregroundColor="Red"
        hoverColor="PurpleDark"
        iconLeft={AddIcon({ color: 'Blue500', style: { marginRight: 8 } })}
        iconRight={LightModeIcon}
      >
        Custom Colors
      </Button>
      <br />

      <Button
        color="GreenForest"
        textAlign="center"
        style={{ width: 250, justifyContent: 'center' }}
      >
        textAlign 'center'
      </Button>
      <br />
      <Button
        textAlign="right"
        space
        style={{ width: 250, justifyContent: 'center' }}
      >
        textAlign 'right'
      </Button>
      <Button disabled space>
        Disabled
      </Button>
      <Button color="Red" disabled>
        Disabled
      </Button>
    </>
  )
}
