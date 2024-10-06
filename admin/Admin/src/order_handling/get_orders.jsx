import { useEffect, useState } from "react";

function Get_order() {
    
        
    const [data  , setData] = useState([])
    
    const fetch_data = async() => {
        try{
            const resp = await axios.get('http://localhost:5000/api/order/fetch_all_orders')
            if(resp.data.success){
                setData(resp.data.orders)
            }
            else{
                console.log(resp.data.message)
            }
        }catch(e){
            console.log(e)
        }
    }
    const confirm_order = async(orderID) => {

        try{
            const resp = await axios.post('http://localhost:5000/api/order/confirm_order' , {orderID : orderID })
            if(resp.data.success){
                window.alert('Successfully Confirmed Order')
                window.location.reload(); // Refresh the page
            }else{
                window.alert('Error Confirming Order, Check Console!')
                console.log(resp.data.message)
            }

        }catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        fetch_data()
    } ,[])


    return(
        <>
            <div className="order_main">
                {data.length > 0 ? <>
                    <div className="order_list">
                        {data.map((item,index) =>{
                            return<div key={index} className="ord_shw">
                                <h2>User ID : {item.userID }</h2>
                                <h2>Item Info</h2>
                                {item.items.map((item , index)=> {
                                    return<> <p>{item.price_data.product_data.name}</p>
                                    <p>{item.price_data.unit_amount}</p>
                                    <p>{item.quantity}</p>
                                    </>
                                }) }
                                <h2>Total Amount : {item.amount}</h2>
                                <h2>User Address : {item.address}</h2>
                                <h2>State Of Order : {item.state}</h2>
                                <h2>Date Of Order : {item.date}</h2>
                                <h2>Payment State : {item.payment}</h2>
                                <h2>Order State : {item.order_conformmation  }</h2> 
                                <button onClick={()=> {
                                    confirm_order(item._id)
                                }}>Confirm Order</button>
                            </div>
                        })}
                    </div>
                </> : <><h1>No New Orders</h1></>}
            </div>
        </>
    )
}

export default Get_order