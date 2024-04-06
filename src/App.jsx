import { useState } from 'react'
import HomePage from './components/pages/homePage'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HeroInfo from './components/pages/heroInfo'


function App() {

  return (
    <div className="App">
      <div className="background"></div>
      <div className="contant">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<HeroInfo />} />        
        </Routes>
      </div>
    </div>
  )
}

export default App
