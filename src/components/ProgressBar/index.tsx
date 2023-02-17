import React from 'react'

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
        <div
          style={{
            margin: '0 auto',
            width: '100%',
            display: 'flex',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 120 120"
            style={{
              transform: 'rotate(-90deg)',
              overflow: 'visible',
              margin: '0 auto',
            }}
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#2C3CEA"
              strokeWidth="24"
              opacity={0.2}
              pathLength="100"
            />

            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#2C3CEA"
              strokeWidth="24"
              strokeDasharray={100}
              pathLength="100"
              strokeDashoffset={100 - barProg}
            />
          </svg>
        </div>
      )}
    </>
  )
}
