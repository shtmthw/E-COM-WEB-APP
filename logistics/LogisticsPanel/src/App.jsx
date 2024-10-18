import { useState } from 'react'
import './App.css'
import { Routes , Route} from 'react-router-dom'
import Home from './home/home'
function App() {

  return (
    <>
      <div className="Infastructure">
          <div className="navbar">
            {/* Navba here */}
          </div>
          <div className="body">
              <Routes>
                  <Route path='/' element={<Home/>} />
              </Routes>
          </div>
      </div>
    </>
  )
}

export default App
