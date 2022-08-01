import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

import '../__mocks__/MockXHR.js'

// avoid the call out to get the rate
jest.mock('../components/shared/LumensRates', () => 'rates')

it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
