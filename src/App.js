import React, { Component } from 'react'
import { CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import data from './store.json'
import TitleBar from './components/TitleBar'
import ConversationList from './containers/ConversationList'
import MessagesList from './containers/MessagesList.js'
import PageNotFound from './components/PageNotFound.js'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})
class App extends Component {
  state = {
    data: {},
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  componentDidMount () {
    console.log(data)
    this.setState({ data })
  }

  parseMessagesList = () => {
    const { messages } = this.state.data
    return messages.allIds.map(id => messages.byId[id])
  }

  parseConversationList = () => {
    const { conversations } = this.state.data
    let conversationList = conversations.allIds.map(
      id => conversations.byId[id]
    )
    let messagesList = this.parseMessagesList()
    return conversationList.map(conversation =>
      Object.assign({}, conversation, {
        messages: messagesList.filter(
          message => message.conversationId === conversation.id
        )
      })
    )
  }

  sortMessages = messages => {
    return messages.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )[0]
  }

  render () {
    const { classes } = this.props
    const conversations = this.state.data.hasOwnProperty('conversations')
      ? this.parseConversationList()
      : this.state.data
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />

          <Switch>
            <Redirect exact from='/' to='/conversations' />
            <Route
              exact
              path='/conversations'
              component={props => (
                <>
                  <TitleBar
                    handleDrawerToggle={this.handleDrawerToggle}
                    header={`Humanise.AI Chat`}
                  />
                  <ConversationList
                    {...props}
                    mobileOpen={this.state.mobileOpen}
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                    handleDrawerToggle={this.handleDrawerToggle}
                  />
                  <MessagesList
                    {...props}
                    mobileOpen={this.state.mobileOpen}
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                    handleDrawerToggle={this.handleDrawerToggle}
                  />
                </>
              )}
            />
            <Route
              exact
              path='/conversations/:id'
              component={props => (
                <>
                  <TitleBar
                    handleDrawerToggle={this.handleDrawerToggle}
                    header={`Humanise.AI Chat`}
                  />
                  <ConversationList
                    {...props}
                    mobileOpen={this.state.mobileOpen}
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                    handleDrawerToggle={this.handleDrawerToggle}
                  />
                  <MessagesList
                    {...props}
                    mobileOpen={this.state.mobileOpen}
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                    handleDrawerToggle={this.handleDrawerToggle}
                  />
                </>
              )}
            />
            <Route component={PageNotFound} status={404}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
