import React, { Component } from 'react'

// modules
import { CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

// data
import data from './store.json'

// component
import TitleBar from './components/TitleBar'
import ConversationList from './containers/ConversationList'
import MessagesList from './containers/MessagesList.js'
import PageNotFound from './components/PageNotFound.js'

const styles = {
  root: {
    display: 'flex'
  }
}
class App extends Component {
  state = {
    data: {},
    mobileOpen: false
  }

  componentDidMount () {
    this.setState({ data })
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  parseMessagesList = () => {
    const { messages } = this.state.data
    return { ...messages }.allIds.map(id => messages.byId[id])
  }

  parseConversationList = () => {
    const { conversations } = this.state.data
    let conversationList = { ...conversations }.allIds.map(
      id => conversations.byId[id]
    )

    // sort & map Messages to specific Conversations
    let messagesList = this.parseMessagesList().sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )

    return conversationList.map(conversation =>
      Object.assign({}, conversation, {
        messages: messagesList.filter(
          message => message.conversationId === conversation.id
        )
      })
    )
  }

  // sort messages according to date - oldest -> latest
  sortMessages = messages => {
    return messages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    )
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
              render={props => (
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
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                  />
                </>
              )}
            />
            <Route
              exact
              path='/conversations/:id'
              render={props => (
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
                    conversations={conversations}
                    sortMessages={this.sortMessages}
                  />
                </>
              )}
            />
            <Route render={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
