import React from 'react'
import { color, Text } from '~'
import { styled } from 'inlines'

type SuggestionTagsProps = {
  suggestion: string
}

const SuggestionHolders = styled('div', {
  padding: '3px 6px',
  marginLeft: 3,
  marginRight: 3,
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  borderRadius: 4,
  width: 'fit-content',
})

export const SuggestionTags = ({ suggestion }: SuggestionTagsProps) => {
  return (
    <SuggestionHolders>
      <Text color="text2">{suggestion}</Text>
    </SuggestionHolders>
  )
}
