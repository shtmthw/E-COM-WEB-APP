import { useState } from 'react'
import Home from './home/home'
import Navbar from './navbar/navbar'
import User_profile from './user_porfile/user_profile'
import { Route, Routes } from 'react-router-dom'
import My_cart from './cart/my_cart'
import PaymentVerification from './payment_verification/paymentVerification'
import UserorderDiplay from './orders/userOrdersDisplay'
function App() {

  return (

    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my_profile' element={<User_profile />} />
          <Route path='/my_cart' element={<My_cart />} />
          <Route path='/verify' element={<PaymentVerification />} />
          <Route path='/my_orders' element={<UserorderDiplay />} />
        
        </Routes>
      </div>

    </>
  )
}

export default App
