import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Item_adding() {

    const [categories, setCategories] = useState([])
    const [selected_categorie, setSelected_Categories] = useState('Not Selected')

    const fetch_category = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/category/get_categories')
            if (resp.data.success) {
                setCategories(resp.data.categories)
            } else {
                console.log(resp.data.message)
            }
        } catch (error) {
            console.log("Error fetching categories: ", error)
        }
    }

    useEffect(() => {
        fetch_category()
    }, [])

    const [item_data, setITMDT] = useState({
        name: "",
        price: 0,
        desc: "",
    })

    const [image, setImage] = useState("")

    const ONCH = (event) => {
        const name = event.target.name
        const value = event.target.value
        setITMDT(prev => ({ ...prev, [name]: value }))
    }

    const add_item = async (form_data) => {
        try {
            const resp = await axios.post('http://localhost:5000/api/items/add_item', form_data)
            if (resp.data.success) {
                window.alert("Item Added!!")
                setITMDT({
                    name: '',
                    price: 0,
                    desc: '',
                })
                setSelected_Categories('Not Selected')
                setImage('')
            } else {
                window.alert("Error Adding Item!!")
                console.log(resp.data.message)
            }
        } catch (error) {
            window.alert("Error Adding Item!!")
            console.log("Error: ", error)
        }
    }

    const handle_form_submission = async (event) => {
        event.preventDefault()
        const form_data = new FormData()
        form_data.append('name', item_data.name)
        form_data.append('price', item_data.price)
        form_data.append('desc', item_data.desc)
        form_data.append('category', selected_categorie)  // Corrected category selection
        form_data.append('image', image)
        add_item(form_data)
    }

    return (
        <div>
            <h1>This is Item adding page</h1>
            <div className="form">
                <form onSubmit={handle_form_submission}>
                    <input
                        type="text"
                        name="name"
                        value={item_data.name}
                        onChange={ONCH}
                        placeholder="Item Name"
                    />
                    <input
                        type="number"
                        name="price"
                        value={item_data.price}
                        onChange={ONCH}
                        placeholder="Price"
                    />
                    <select name="category" value={selected_categorie} onChange={(e) => setSelected_Categories(e.target.value)}>
                        <option value="Not Selected">Not selected</option>
                        {categories.map((item) => (
                            <option key={item._id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <textarea
                        name="desc"
                        value={item_data.desc}
                        onChange={ONCH}
                        placeholder="Item Description"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit">Add Item</button>
                </form>
            </div>
        </div>
    )
}

export default Item_adding
