import axios from "axios"
import { useEffect, useState } from "react"


function Item_list(){
    
    const [item_list, setItem_list] = useState([])

    const fetch_list= async() => {
        const resp = await axios.get('http://localhost:5000/api/items/getall_item')
        if(resp.data.success){
            setItem_list(resp.data.items)
        }
        else{
            console.log(resp.data.message)
        }
    }   

    useEffect(()=>{
        fetch_list()
    } , [])

    return(
        <>
            <div>
            {item_list.length === 0 ? <><h1>Not Items Added!</h1></> :

                <>{item_list.map((item, index) => {
                    return<div key={index}>
                        <h2>{item.name}</h2>
                        <h2>{item.price}</h2>
                        <h2>{item.category}</h2>
                        <img src={`http://localhost:5000/item_images/${item.image}`} alt=""  width={200}/>
                        <button onClick={async()=>{
                            const resp = await axios.post('http://localhost:5000/api/items/del_item' , {itemID : item._id})
                            if(resp.data.success){
                                window.alert('Item Removed.')
                            }
                            else{
                                console.log(resp.data.message)
                            }
                        }} >Remove</button>

                    </div>
              })}</>}
            </div>

            <br />
            <hr />
        </>
    )
}

export default Item_list