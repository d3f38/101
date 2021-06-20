import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { WelcomePage } from './views/WelcomePage'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <WelcomePage />
      </Route>
    </Switch>
  )
}
