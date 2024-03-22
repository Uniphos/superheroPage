import { useState } from 'react'
import HomePage from './components/pages/homePage'
import './App.css'

function App() {

  return (
    <div className="App">
      <div className="background"></div>
      <div className="contant">
        <HomePage />
      </div>
    </div>
  )
}

export default App
