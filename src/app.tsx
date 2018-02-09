import * as React from 'react'
import { render } from 'react-dom'

import { Numbers } from './components/numbers'


// App
const AppView: React.StatelessComponent<any> = props => (
  <div>
    <Numbers />
  </div>
)
const App = AppView
const root = document.createElement('div')
document.body.appendChild(root)
render(<App />, root)
