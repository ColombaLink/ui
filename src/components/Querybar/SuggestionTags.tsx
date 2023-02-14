import React from 'react'
import { color, Text } from '~'
import { styled } from 'inlines'

type SuggestionTagsProps = {
  suggestion: string
  onClick: () => void
}

export const SuggestionTags = ({
  suggestion,
  onClick,
}: SuggestionTagsProps) => {
  return (
    <styled.div
      style={{
        padding: '3px 6px',
        marginLeft: 3,
        marginRight: 3,
        border: `1px solid ${color('border')}`,
        backgroundColor: color('background'),
        borderRadius: 4,
        width: 'fit-content',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: color('background2'),
        },
      }}
      onClick={onClick}
    >
      <Text color="text2">{suggestion}</Text>
    </styled.div>
  )
}
