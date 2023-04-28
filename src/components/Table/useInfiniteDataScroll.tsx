import { useState, useEffect, useRef } from 'react'

type CurrentRef = {
  offset: number
  blocks: number
  scrollY: number
  items: any[]
  timer: ReturnType<typeof setTimeout>
  subs: { [subId: string]: () => void }
}

type OnNextBlock = (
  currentRef: CurrentRef,
  update: (checksum: string) => any,
  blocks: number,
  limit: number,
  offset: number
) => void

const nextBla: OnNextBlock = (
  currentRef,
  update,
  blocks
  // limit: number,
  // offset: number
) => {
  const subs = {} // blocksquery
  let i = blocks

  // and then a wrapper here

  while (i--) {
    // const start = offset + limit * i
    const payload = {
      // $id: target,
      // $language: language,
      // items: query(start, limit),
    }
    // const q = client.query('db', payload)
    const q = { id: 0 }

    subs[q.id] = currentRef.subs[q.id] // ||
    // q.subscribe(({ items }, checksum) => {
    //   for (let i = 0; i < items.length; i++) {
    //     currentRef.items[i + offset] = items[i]
    //   }
    //   // upgrade
    //   setChecksum(`${offset}-${checksum}`)
    // })
  }

  for (const subId in currentRef.subs) {
    if (!(subId in subs)) {
      currentRef.subs[subId]()
    }
  }

  currentRef.subs = subs
}

export const useInfiniteDataScroll = (
  onNextBlock: OnNextBlock,
  {
    itemSize,
    itemCount,
    height,
    limit = Math.ceil(height / itemSize),
    treshold = 0,
    queryId = 0,
    delay = 100,
  }: {
    itemSize: number
    itemCount: number
    height: number
    limit?: number
    delay?: number
    treshold?: number
    queryId?: number
  }
) => {
  const blockHeight = itemSize * limit

  const [, setChecksum] = useState('')

  const [offset, setOffset] = useState(0)
  const [blocks, setBlocks] = useState(() => {
    let blocks = Math.ceil(height / blockHeight)
    if (treshold) {
      blocks += Math.ceil(
        (height / itemSize + treshold - blocks * limit) / limit
      )
    }
    return blocks
  })

  const { current } = useRef<CurrentRef>()

  useEffect(() => {
    return () => {
      const { subs } = current
      for (const subId in subs) {
        subs[subId]()
      }
      current.subs = {}
    }
  }, [current])

  useEffect(() => {
    onNextBlock(current, setChecksum, blocks, limit, offset)
  }, [offset, blocks, current, queryId])

  useEffect(update, [
    blockHeight,
    delay,
    height,
    itemSize,
    current,
    limit,
    treshold,
  ])

  return {
    loading: !itemCount || !current.items.length,
    itemCount,
    items: current.items,
    cache: current,
    onScrollY: (scrollY) => {
      if (current.scrollY !== scrollY) {
        current.scrollY = scrollY
        update()
      }
    },
  }

  // usecallback for this
  function update() {
    const start = Math.max(0, current.scrollY / itemSize - treshold)
    const end = (current.scrollY + height) / itemSize
    const newOffset = start - (start % limit)
    let newBlocks = Math.ceil(
      height / blockHeight + (current.scrollY % blockHeight) / blockHeight
    )

    if (treshold) {
      const newLength = newOffset + limit * newBlocks
      newBlocks += Math.max(0, Math.ceil((end + treshold - newLength) / limit))
    }

    if (newOffset !== current.offset || newBlocks !== current.blocks) {
      current.offset = newOffset
      current.blocks = newBlocks

      const set = () => {
        setOffset(current.offset)
        setBlocks(current.blocks)
      }

      if (current.timer) {
        clearTimeout(current.timer)
      } else {
        set()
      }

      current.timer = setTimeout(() => {
        current.timer = null
        set()
      }, delay)
    } else if (current.timer) {
      clearTimeout(current.timer)
      current.timer = setTimeout(() => {
        current.timer = null
        setOffset(current.offset)
        setBlocks(current.blocks)
      }, delay)
    }
  }
}
