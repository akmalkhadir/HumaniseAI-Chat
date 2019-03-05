import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import { Link } from 'react-router-dom'

const ConversationItem = ({ conversation, sortMessages }) => {
  const linkToConversation = props => {
    return (
      <Link
        to={{
          pathname: `/conversations/${conversation.id}`,
          state: {
            conversation
          }
        }}
        {...props}
      />
    )
  }

  let lastConversation = sortMessages(conversation.messages)[conversation.messages.length - 1]

  return (
    <ListItem component={linkToConversation} button>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText
        primary={conversation.title}
        secondary={lastConversation.text}
      />
    </ListItem>
  )
}

export default ConversationItem
