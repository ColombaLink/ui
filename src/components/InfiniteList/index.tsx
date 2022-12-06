import {
  addSubscriber,
  removeSubscriber,
  generateSubscriptionId,
} from '@based/client'
import React, { useRef, useState, useEffect } from 'react'
import { FixedSizeList } from 'react-window'
import { useData, useClient } from '@based/react'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'

const List = styled(FixedSizeList, scrollAreaStyle)

const addScrollSub = (client, subId, payload, offset, current, setChecksum) => {
  const [, subscriberId] = addSubscriber(
    client.client,
    payload,
    ({ items }, checksum) => {
      for (let i = 0; i < items.length; i++) {
        current.items[i + offset] = items[i]
      }
      setChecksum(`${offset}-${checksum}`)
    },
    (err) => err && console.error(err),
    console.error,
    subId
  )
  return subscriberId
}

export type InfiniteListQueryResponse = {
  [key: string]: any
  $list: {
    $find: object
  }
}

export type InfiniteListQuery = (
  offset: number,
  limit: number
) => InfiniteListQueryResponse

export const useInfiniteScroll = ({
  query,
  delay = 100,
  itemSize = 50,
  height = 400,
  limit = Math.ceil(height / itemSize),
  treshold = 0,
  target = 'root',
  language = 'en',
}) => {
  const blockHeight = itemSize * limit
  const client = useClient()
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

  const [, setChecksum] = useState()
  const { current } = useRef({
    offset,
    blocks,
    scrollY: 0,
    items: [],
    timer: null,
    subs: {},
  })

  useEffect(() => {
    if (client) {
      return () => {
        const { subs } = current
        current.subs = {}
        setTimeout(() => {
          for (const subId in subs) {
            const subscriberId = current.subs[subId]
            removeSubscriber(client.client, Number(subId), subscriberId)
          }
        })
      }
    }
  }, [client, current])

  useEffect(() => {
    if (client) {
      const subs = {}
      let i = blocks

      while (i--) {
        const start = offset + limit * i
        const payload = {
          $id: target,
          $language: language,
          items: query(start, limit),
        }
        const subId = generateSubscriptionId(payload)
        subs[subId] =
          current.subs[subId] ||
          addScrollSub(client, subId, payload, start, current, setChecksum)
      }

      for (const subId in current.subs) {
        if (!(subId in subs)) {
          const subscriberId = current.subs[subId]
          removeSubscriber(client.client, Number(subId), subscriberId)
        }
      }

      current.subs = subs
    }
  }, [target, client, offset, blocks, query, current, language]) // dont include limit

  useEffect(update, [
    blockHeight,
    delay,
    height,
    itemSize,
    current,
    limit,
    treshold,
  ])

  const {
    data: { itemCount },
  } = useData({
    $id: target as string,
    $language: language,
    itemCount: {
      $aggregate: {
        $function: 'count',
        ...query(0, 0)?.$list?.$find,
      },
    },
  })

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

export const InfiniteList = (props) => {
  const { itemCount, items, onScrollY, loading } = useInfiniteScroll(props)

  if (loading) {
    return null
  }

  return (
    <List
      style={props.style}
      height={props.height}
      width={props.width}
      itemSize={props.itemSize}
      itemData={props.itemData ? props.itemData(items) : items}
      itemCount={itemCount}
      onScroll={({ scrollOffset }) => onScrollY(scrollOffset)}
    >
      {props.children}
    </List>
  )
}
