import React from 'react'
import Home from './Components/Home'
import About from './Components/About'
import Bookevents from './Components/Bookevents'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/bookevents" element={<Bookevents/>}/>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App