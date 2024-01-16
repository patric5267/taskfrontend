import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Completed from './components/Completed'
import Important from './components/Important'
import Do from './components/Do'
import Navbar from './components/Navbar'
import Phone from './components/Phone'
import Login from './components/Login'
import Sign from './components/Sign'
function App() {
  return (
    <Router>
      <div className='fixed h-full w-full flex justify-center  xl:items-center'>
        <div className='flex xl:w-[100rem] w-full h-full px-3 py-3 '>
          <Phone/>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/important' element={<Important />} />
            <Route path='/do' element={<Do />} />
            <Route path='/sign' element={<Sign/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
