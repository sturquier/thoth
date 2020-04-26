import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home, Login } from './pages'

export default function AppRouting () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
      </Switch>
    </BrowserRouter>
  )
}
