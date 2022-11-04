import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

const element = document.getElementById('app')
if (!element) {
  throw new Error('No root element found')
}

ReactDOM.hydrateRoot(
  element,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
