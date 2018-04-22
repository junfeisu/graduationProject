import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import createStore from './store/createStore'
import rotues from './route'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const mountNode = document.querySelector('#app')

render(
  (
    <Provider store={store}>
      <Router history={hashHistory} children={routes} />
    </Provider>
  ),
  mountNode
)
