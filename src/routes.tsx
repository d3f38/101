import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Game } from './views/Game'
import { Welcome } from './views/Welcome'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route exact path="/game">
        <Game />
      </Route>
    </Switch>
  )
}
