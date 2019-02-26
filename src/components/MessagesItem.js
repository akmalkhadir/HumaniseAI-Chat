import React from 'react'
import { List, ListItem, ListItemText, Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
})

const MessagesItem = ({ classes, message }) => {

  const options = {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return (
    <List className={classes.root}>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={message.text}
          secondary={
            <Typography
              component='span'
              variant='caption'
              className={classes.inline}
              color='textPrimary'
            >
              {new Date(message.timestamp).toLocaleDateString(undefined, options)}
            </Typography>
          }
        />
      </ListItem>
    </List>
  )
}

export default withStyles(styles)(MessagesItem)
