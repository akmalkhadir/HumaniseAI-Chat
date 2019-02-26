import React from 'react'
import {
  Drawer,
  Hidden,
  withStyles,
  Typography,
  Divider,
  List
} from '@material-ui/core'
import ConversationItem from '../components/ConversationItem'

const drawerWidth = 280

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
})

const ConversationList = ({
  classes,
  mobileOpen,
  handleDrawerToggle,
  conversations,
  sortMessages
}) => {
  const conversationsToRender = conversations.length ? (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {conversations.map(conversation => (
          <ConversationItem
            conversation={conversation}
            sortMessages={sortMessages}
            key={conversation.id}
          />
        ))}
      </List>
      <Divider />
    </div>
  ) : (
    <Typography>`No conversations`</Typography>
  )
  return (
    <nav className={classes.drawer}>
      <Hidden smUp>
        <Drawer
          variant='temporary'
          anchor='left'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {conversationsToRender}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {conversationsToRender}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default withStyles(styles)(ConversationList)
