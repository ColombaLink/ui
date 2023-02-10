import React from 'react'
import { UploadIcon } from '~/icons'

export type ProgressBarProps = {
  progress: number
  circle?: boolean
}

export const ProgressBar = ({ progress, circle }: ProgressBarProps) => {
  const barProg = progress * 100

  return (
    <>
      {!circle ? (
        <div
          style={{
            backgroundColor: 'lightgray',
            position: 'relative',
            width: '100%',
            marginRight: 12,
            height: 10,
          }}
        >
          <div
            style={{
              backgroundColor: 'darkgray',
              top: 0,
              left: 0,
              position: 'absolute',
              width: `${barProg}%`,
              //   width: `75%`,
              height: '100%',
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
