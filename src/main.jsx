import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import People from './People.jsx'
import './index.css'
import InfoBox from './InfoBox.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InfoBox />
    <People />
  </React.StrictMode>,
)
