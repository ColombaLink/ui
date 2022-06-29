import React from 'react'
import {
  DraggableListWrapper,
  ListItem,
  StackedListItems,
  StackedListItemsWrapper,
} from '~/components/ListItems'
import { Badge } from '~/components/Badge'
import { Container } from '~/components/Container'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { Thumbnail } from '~/components/Thumbnail'
import {
  TextIcon,
  MoreIcon,
  EditIcon,
  CheckIcon,
  AddIcon,
  ApertureIcon,
  ListIcon,
} from '~'
import { Avatar } from '~/components/Avatar'

export const ListItems = () => {
  return (
    <Provider>
      <div style={{ paddingBottom: 64 }}>
        <Container
          topLeft={
            <>
              <ListIcon />
              <Text>ListItem</Text>
            </>
          }
          topRight={MoreIcon}
          style={{ maxWidth: 767 }}
          space="32px"
        >
          <ListItem
            left={
              <>
                <Thumbnail
                  size={36}
                  icon={TextIcon({ size: 16 })}
                  color="AccentDarkpurple"
                />
                <Text weight={600}>Title</Text>
                <Badge action light>
                  string
                </Badge>
              </>
            }
            right={
              <>
                <Badge>Published</Badge>
                <MoreIcon />
              </>
            }
          ></ListItem>

          <ListItem
            left={
              <>
                <Thumbnail
                  size={36}
                  icon={EditIcon({ size: 16 })}
                  color="AccentBabyblue"
                />
                <Text weight={600}>Content</Text>
                <Badge action light>
                  Rich Text
                </Badge>
              </>
            }
            right={
              <>
                <Badge>Published</Badge>
                <MoreIcon />
              </>
            }
          ></ListItem>
        </Container>

        <Container
          style={{ maxWidth: 767 }}
          space="32px"
          topLeft={<Text>Draggable ListItems</Text>}
        >
          <DraggableListWrapper>
            <ListItem
              draggable
              left={
                <>
                  <Thumbnail
                    size={36}
                    backgroundImg="https://robohash.org/S4J.png?set=set4&size=150x150"
                    backgroundColor="AccentGreen"
                  />
                  <Text weight={600}>Drag & Drop</Text>
                  <Badge action light>
                    Drop it
                  </Badge>
                </>
              }
              right={
                <>
                  <Badge action>Drag it</Badge>
                  <MoreIcon />
                </>
              }
            ></ListItem>
            <ListItem
              draggable
              left={
                <>
                  <Thumbnail
                    size={36}
                    icon={ApertureIcon({ size: 16 })}
                    color="AccentPink"
                  />
                  <Text weight={600}>Drag & Drop</Text>
                  <Badge action light>
                    Drop it
                  </Badge>
                </>
              }
              right={
                <>
                  <Badge outline ghost>
                    Drop it
                  </Badge>
                  <MoreIcon />
                </>
              }
            ></ListItem>
          </DraggableListWrapper>
        </Container>

        <Container
          style={{ maxWidth: 767 }}
          space
          topLeft={<Text>Stacked ListItems</Text>}
        >
          <StackedListItemsWrapper
            topLeft={
              <>
                <Text color="TextSecondary">Keep</Text>
                <Text color="AccentDarkpurple">Trucking</Text>
              </>
            }
            topRight={<Avatar />}
            bottomLeft={
              <>
                <Button iconLeft={AddIcon} ghost>
                  One
                </Button>
                <Button>Two</Button>
              </>
            }
            bottomRight={CheckIcon}
            space
          >
            <StackedListItems
              childrenRight={
                <>
                  <MoreIcon />
                </>
              }
            >
              <Avatar
                size={40}
                icon={CheckIcon({ size: 16 })}
                color="AccentGreen"
              />
              <div>
                <Text weight={600}>Header</Text>
                <Text color="TextSecondary">
                  Header enabled on this StackedListItems.
                </Text>
              </div>
            </StackedListItems>
            <StackedListItems childrenRight={<MoreIcon />}>
              <Avatar
                size={40}
                icon={EditIcon({ size: 16 })}
                color="AccentMustard"
              />
              <div>
                <Text weight={600}>Developer</Text>
                <Text color="TextSecondary">
                  Can create, update and delete models and content.
                </Text>
              </div>
            </StackedListItems>
            <StackedListItems childrenRight={<MoreIcon />}>
              <Avatar
                size={40}
                backgroundImg="https://robohash.org/4P5.png?set=set4&size=150x150"
              />
              <div>
                <Text weight={600}>Footer</Text>
                <Text color="TextSecondary">
                  Footer + space enabled on this StackedListItemsWrapper.
                </Text>
              </div>
            </StackedListItems>
          </StackedListItemsWrapper>
        </Container>
      </div>
    </Provider>
  )
}
