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
root.id = 'appRoot'
document.body.appendChild(root)

const renderApp = () => render(<App />, root)
renderApp()

// HMR
// hot(module)(App)
if (module.hot) {
  module.hot.dispose(() => {
    if (root.parentNode) root.parentNode.removeChild(root)
  })
}
