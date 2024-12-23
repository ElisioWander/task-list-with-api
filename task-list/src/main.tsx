import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ModalContextPrvider } from './Context/ModalContext'

import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalContextPrvider>
      <App />
    </ModalContextPrvider>
  </React.StrictMode>,
)
