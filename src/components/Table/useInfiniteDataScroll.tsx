import { useState, useEffect, useRef } from 'react'

export const useInfiniteDataScroll = ({
  data,
  delay = 100,
  itemSize = 56,
  height = 400,
  limit = Math.ceil(height / itemSize),
  treshold = 0,
  //   target = 'root',
  //   language = 'en',
}) => {
  //   const queryId = useMemo(() => {
  //     return data
  //   }, [data])

  const blockHeight = itemSize * limit
  //   const client = useClient()
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

  //   const [, setChecksum] = useState<string>()
  const { current } = useRef({
    offset,
    blocks,
    scrollY: 0,
    items: [],
    timer: null,
    subs: {},
  })

  //   useEffect(() => {
  //     if (client) {
  //       return () => {
  //         const { subs } = current
  //         for (const subId in subs) {
  //           current.subs[subId]()
  //         }
  //         current.subs = {}
  //       }
  //     }
  //   }, [client, current])

  //   useEffect(() => {
  //     console.log('current fire 🌶')
  //   }, [current])

  //   useEffect(() => {
  //     if (client) {
  //       const subs = {}
  //       let i = blocks

  //       while (i--) {
  //         const start = offset + limit * i
  //         const payload = {
  //           $id: target,
  //           $language: language,
  //           items: query(start, limit),
  //         }
  //         const q = client.query('db', payload)
  //         subs[q.id] =
  //           current.subs[q.id] ||
  //           q.subscribe(({ items }, checksum) => {
  //             for (let i = 0; i < items.length; i++) {
  //               current.items[i + offset] = items[i]
  //             }
  //             setChecksum(`${offset}-${checksum}`)
  //           })
  //       }

  //       for (const subId in current.subs) {
  //         if (!(subId in subs)) {
  //           current.subs[subId]()
  //         }
  //       }

  //       current.subs = subs
  //     }
  //   }, [target, client, offset, blocks, current, language, queryId])

  useEffect(update, [
    blockHeight,
    delay,
    height,
    itemSize,
    current,
    limit,
    treshold,
  ])

  //   const { data } = useQuery('db', {
  //     $id: target as string,
  //     $language: language,
  //     itemCount: {
  //       $aggregate: {
  //         $function: 'count',
  //         ...query(0, 0)?.$list?.$find,
  //       },
  //     },
  //   })

  const itemCount = data?.length

  //   console.log(itemCount, 'itemCount')
  //   console.log('🥔')
  //   console.log('itemss??', current.items)

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