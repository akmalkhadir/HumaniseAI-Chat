import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import { Link } from 'react-router-dom'

const ConversationItem = ({ conversation, sortMessages, key }) => {
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
  return (
    <ListItem component={linkToConversation} button key={key}>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText
        primary={conversation.title}
        secondary={sortMessages(conversation.messages).text}
      />
    </ListItem>
  )
}

export default ConversationItem
