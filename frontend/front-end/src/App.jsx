import { useState } from 'react'
import Home from './home/home'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (

    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
