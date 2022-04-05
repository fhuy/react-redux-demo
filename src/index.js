import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'

import { countAddAction } from './actions/counter_action'
import { loadPostAction } from './actions/post_action'
store.dispatch(countAddAction)
store.dispatch(loadPostAction)

ReactDOM.render(<App />, document.getElementById('root'))

// serviceWorker.unregister()