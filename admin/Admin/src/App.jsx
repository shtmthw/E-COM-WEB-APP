import { useState } from 'react'
import Home from './home/home'
import { Route, Routes  } from 'react-router-dom'
import Item_adding from './item_handling/item_addition/ia'
import Add_category from './category_handling/add_category'
import Item_list from './item_handling/item_list/get_items'
import Get_delete_categories from './category_handling/del & get_categories'
import Get_order from './order_handling/get_orders'
function App() {

  return (
    <>
    <h1>--Imagine Navbar here--</h1>
     <div>
     <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add_item' element={<Item_adding />} />
          <Route path='/add_category' element={<Add_category />} />
          <Route path='/item_list' element={<Item_list />} />
          <Route path='/category_list' element={<Get_delete_categories />} /> {/* Useless, just for some DSA test and revision :) */}
          <Route path='/order_list' element={<Get_order/>} /> {/* Useless, just for some DSA test and revision :) */}
        
        </Routes>
     </div>
    </>
  )
}

export default App
