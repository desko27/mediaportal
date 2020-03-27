import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MainRoute from './routes/MainRoute'
import PortalRoute from './routes/PortalRoute'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/main'>
          <MainRoute />
        </Route>
        <Route path='/portal'>
          <PortalRoute />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
