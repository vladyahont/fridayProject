import React from 'react'

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    {/*<React.StrictMode>*/}
      <Provider store={store}>
        <App />
      </Provider>
    {/*</React.StrictMode>*/}
  </BrowserRouter>
)
