import React from 'react'
import { render } from 'react-testing-library'
import TitleBar from './TitleBar'

describe('TitleBar', () => {
  const props = { header: 'Humanise Chat' }

  it('renders the Title Bar', () => {
    const { queryByText } = render(<TitleBar {...props} />)
    const header = queryByText(props.header)
    expect(header.innerHTML).toBe(props.header)
  })
})
