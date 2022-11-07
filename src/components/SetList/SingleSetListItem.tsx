import React from 'react'
import {
  color,
  Text,
  Badge,
  MoreIcon,
  DeleteIcon,
  EditIcon,
  useContextMenu,
  ContextItem,
} from '~'
import { styled } from 'inlines'

const StyledSetListItem = styled('div', {
  border: `1px solid ${color('border')}`,
  borderRadius: 4,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 8,
})

export const SingleSetListItem = ({
  item,
  id,
  itemType,
  deleteSpecificItem,
  editSpecificItem,
}) => {
  const contextHandler = useContextMenu(
    ContextMenu,
    { editSpecificItem, deleteSpecificItem, item, id },
    { placement: 'right' }
  )

  return (
    <StyledSetListItem>
      <Badge>{itemType}</Badge>
      <Text style={{ marginLeft: '12px' }}>{item}</Text>
      <MoreIcon
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        // open options on clik
        //  onPointerDown={stopPropagation}
        onClick={contextHandler}
      />
    </StyledSetListItem>
  )
}

const ContextMenu = ({ editSpecificItem, deleteSpecificItem, item, id }) => {
  return (
    <>
      <ContextItem onClick={() => editSpecificItem(item, id)} icon={EditIcon}>
        Edit
      </ContextItem>
      <ContextItem
        onClick={() => deleteSpecificItem(item, id)}
        icon={DeleteIcon}
      >
        Delete
      </ContextItem>
    </>
  )
}
