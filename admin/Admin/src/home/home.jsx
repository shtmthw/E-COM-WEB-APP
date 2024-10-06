import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>This Is Home</h1>
      <h3 onClick={() => {
        navigate('/add_item')
      }}>Add Item</h3>
      <h3 onClick={() => {
        navigate('/add_category')
      }}>Add Category</h3>
      <h3 onClick={() => {
        navigate('/item_list')
      }}>Produts</h3>
      <h3 onClick={() => {
        navigate('/category_list')
      }}>Categories</h3>
            <h3 onClick={() => {
        navigate('/order_list')
      }}>Orders</h3>
    </div>
  )
}

export default Home