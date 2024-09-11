import React, { useContext } from 'react'
import { StoreContext } from '../globalcontex/store_contex_GLB'
function Home() {
    
    const {Check_context} = useContext(StoreContext)
    
  
    return (
    <div>
      <h1>{Check_context}</h1>
    </div>
  )
}

export default Home