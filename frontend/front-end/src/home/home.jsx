import React, { useContext } from 'react'
import { StoreContext } from '../globalcontex/store_contex_GLB'
import Navbar from '../navbar/navbar'
function Home() {
    
    const {Check_context} = useContext(StoreContext)
    
  
    return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home