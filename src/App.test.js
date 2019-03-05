import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import App from './App'
import TitleBar from './components/TitleBar'
import ConversationList from './containers/ConversationList'
import MessagesList from './containers/MessagesList'

describe('App', () => {
  afterEach(cleanup)

  test('should render a <TitleBar /> with passed in string prop', () => {
    const { getByText, getByTestId, container, asFragment } = render(<App />)
    expect(getByTestId('title-bar')).toHaveTextContent('Humanise.AI Chat')
  })
})
