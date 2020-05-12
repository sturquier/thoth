import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home, Login, NotFound } from './pages'

export default function AppRouting () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </BrowserRouter>
  )
}
