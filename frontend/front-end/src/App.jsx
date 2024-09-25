import { useState } from 'react'
import Home from './home/home'
import Navbar from './navbar/navbar'
import User_profile from './user_porfile/user_profile'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (

    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my_profile' element={<User_profile />} />

        </Routes>
      </div>

    </>
  )
}

export default App
