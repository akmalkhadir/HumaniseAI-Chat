import React, { Component } from 'react'
import { CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TitleBar from './components/TitleBar'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})
class App extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render () {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <TitleBar handleDrawerToggle={this.handleDrawerToggle} header={`Humanise Chat`} />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)
