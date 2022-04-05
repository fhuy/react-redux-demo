import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { get } from 'axios'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// redux中的三个重要部分：action reducer state(store)

const counterReducer = function(state = { count: 1 }, action) {
    console.log(action)
    // { type: 'COUNT_ADD', payload: { } }
    switch (action.type) {
        case 'COUNT_ADD':
            return {
                ...state, count: state.count + 1
            }
        case 'COUNT_REDUCE':
            return {
                ...state, count: state.count - 1
            }
        default:
            return state
    }
}

const postReducer = function(state = { list: [ { title: '你好！' } ] }, action) {
    switch (action.type) {
        case 'LOAD_POSTS':
            return {
                ...state, list: action.payload
            }
        default:
            return state
    }
}

// 通过combineReducers把多个reducer进行合并
const rootReducers = combineReducers({
    counter: counterReducer,
    post: postReducer
})

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(...[thunk]),    // 需要使用的中间件数组
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    // counterReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch({
    type: 'COUNT_ADD',
    payload: {}
})

console.log(store)
console.log(store.getState())
// { count: 1 ——> 2 }

// 如果要改变一个reducer的值，需要使用dispatch派发一个action

store.dispatch({
    type: 'COUNT_REDUCE',
    payload: {}
})

console.log(store)
console.log(store.getState())
// { count: 2 ——> 1 }

const getPostRequest = () => {
    return get('https://jsonplaceholder.typicode.com/posts')
}

store.dispatch(async function(dispatch){
    const res = await getPostRequest()
    console.log(res.data)
    dispatch({
        type: 'LOAD_POSTS',
        payload: res.data
    })
})

ReactDOM.render(<App />, document.getElementById('root'))

// combineReducers后，获取到的state：
// {
//     counter: {
//         count: 1
//     },
//     post: {
//         list: [
//             {
//                 title: '你好！'
//             }
//         ]
//     }
// }