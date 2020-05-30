import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { history } from '../store/middlewares'
import { ChangePassword, Crawler, Home, Login, NotFound, Profile, Register } from './pages'

export default function AppRouting () {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/change-password' render={() => <ChangePassword />} />
        <Route exact path='/crawler' render={() => <Crawler />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/profile' render={() => <Profile />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </ConnectedRouter>
  )
}
