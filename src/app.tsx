import * as React from 'react'
import { render } from 'react-dom'

import { Numbers } from './components/Numbers'

const AppView: React.StatelessComponent<any> = props => (
  <div>
    <Numbers />
  </div>
)
const App = AppView
const root = document.createElement('div')
document.body.appendChild(root)
const renderApp = () => render(<App />, root)
renderApp()

// HMR
if (module.hot) {
  module.hot.dispose(() => {
    root.parentNode!.removeChild(root)
  })
}
