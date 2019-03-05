import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import MessagesItem from '../components/MessagesItem'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  }
})

const MessagesList = ({ classes, conversations, match, sortMessages }) => {
  let messages =
    match.params.id && conversations.length > 0 ? (
      conversations.find(conversation => conversation.id === match.params.id)
        .messages
    ) : (
      <Typography>Please select a conversation</Typography>
    )
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {match.params.id && conversations.length > 0
        ? sortMessages(messages).map(message => <MessagesItem message={message} key={message.id} />)
        : messages}
    </main>
  )
}

export default withStyles(styles)(MessagesList)
