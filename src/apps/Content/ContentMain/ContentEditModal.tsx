import React from 'react'
import { styled } from 'inlines'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'
import { color } from '~/utils'
import { ContentEditor } from './ContentEditor'
import { CheckIcon, CloseIcon } from '~/icons'
import { useCopyToClipboard } from '~/hooks'
import { removeOverlay } from '~/components/Overlay'
import { Select } from '~/components/Select'

export const ContentEditModal = ({ data, fields }) => {
  const [copied, copy] = useCopyToClipboard(data?.id)

  return (
    <styled.div
      style={{
        background: color('background'),
        display: 'flex',
        borderRadius: 12,
        width: 'calc(100% -  64px)',
        maxWidth: 1164,
        height: 'calc(100% -  64px)',
      }}
    >
      <styled.div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            padding: '24px 32px',
          }}
        >
          <Text typography="subtitle500">{data?.type || data?.id}</Text>
        </styled.div>
        <styled.div>
          <ContentEditor data={data} fields={fields} />
        </styled.div>
      </styled.div>

      <styled.div
        style={{
          maxWidth: 260,
          width: '100%',
          backgroundColor: color('background2'),
          padding: 24,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderLeft: `1px solid ${color('border')}`,
          position: 'relative',
        }}
      >
        <Button
          style={{
            position: 'absolute',
            height: 32,
            width: 32,
            top: 24,
            right: 32,
            borderRadius: 16,
          }}
          icon={<CloseIcon color="text2" />}
          color="border"
          onClick={() => removeOverlay()}
        />
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            height: 54,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'end',
            paddingBottom: 8,
          }}
        >
          <Text typography="caption600">STATUS</Text>
        </styled.div>
        <Button large style={{ width: '100%', marginBottom: 12 }}>
          Publish
        </Button>
        <Text color="text2" style={{ marginBottom: 12 }}>
          Last snurp
        </Text>
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            height: 54,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'end',
            paddingBottom: 8,
          }}
        >
          <Text typography="caption600">ID</Text>
        </styled.div>
        <Badge
          onClick={() => copy()}
          icon={copied ? <CheckIcon /> : ''}
          style={{ marginBottom: 6 }}
        >
          {data?.id}
        </Badge>
        {copied && <Text typography="caption500">copied to clipboard!</Text>}
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            height: 54,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'end',
            paddingBottom: 8,
          }}
        >
          <Text typography="caption600">TRANSLATION</Text>
        </styled.div>
        <Select
          options={['English (en)', 'Dutch (nl)']}
          placeholder="Select a language"
        />
      </styled.div>
    </styled.div>
  )
}
