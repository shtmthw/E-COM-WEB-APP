import { useEffect, useState } from "react";
import axios from "axios";
function Get_order() {


    const [data, setData] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [pageAmnt, setPageAmnt] = useState(null)
    const [pagesArr, setPagesArr] = useState([])


    const fetch_data = async () => {
        try {
            const resp = await axios.post(`http://localhost:5000/api/order/fetch_all_orders?currPage=${currPage}`)
            if (resp.data.success) {
                setData(resp.data.orders)
            }
            else {
                console.log(resp.data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getTotalPage = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/order/getTotalPages')
            if (resp.data.success) {
                setPageAmnt(resp.data.totalPages)
                const arrOfPages = []
                for(let i = 1 ; i <=resp.data.totalPages ; i++){
                    arrOfPages.push(i)
                }
                setPagesArr(arrOfPages)
            } else {
                window.alert('Error Getting Pages Amount')
                console.log(resp.data.message)
            }
        } catch (e) {
            window.alert('error in the client side catch block')
            console.log(e)
        }
    }


    const confirm_order = async (orderID) => {

        try {
            const resp = await axios.post('http://localhost:5000/api/order/confirm_order', { orderID: orderID })
            if (resp.data.success) {
                window.alert('Successfully Confirmed Order')
                window.location.reload(); // Refresh the page
            } else {
                window.alert('Error Confirming Order, Check Console!')
                console.log(resp.data.message)
            }

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        fetch_data()
    }, [currPage])


    useEffect(() => {
        getTotalPage()
    }, [])


    useEffect(() => {
        console.log(pagesArr)
    }, [pagesArr])
    return (
        <>
            <h1>Order</h1>
            <div className="order_main">
                {data.length > 0 ? <>
                    <div className="order_list">
                        {data.map((item, index) => {
                            return <div key={index} className="ord_shw">
                                <h2>User ID : {item.userID}</h2>
                                <h2>Item Info</h2>
                                {item.items.map((inritem, inrindex) => {
                                    return <> <p>{inritem.price}</p>
                                        <p>{inritem.name}</p>
                                        <p>{inritem.quantity}</p>
                                    </>
                                })}
                                <h2>Total Amount : {item.amount}</h2>
                                <h2>User Address : {item.address}</h2>
                                <h2>State Of Order : {item.state}</h2>
                                <h2>Date Of Order : {item.date}</h2>
                                <h2>Payment State : {item.payment ? 'Paid' : 'Unpaid'}</h2>
                                <h2>Order State : {item.order_conformmation ? 'Confirmed' : 'Unconfirmed'}</h2>
                                <button onClick={() => {
                                    confirm_order(item._id)
                                }}>Confirm Order</button>
                                <br /><hr />

                            </div>

                        })}
                        <div className="btnCntrl">
                        <button disabled={currPage === 1} onClick={() => {
                            setCurrPage(prev => prev - 1)
                        }}>prev</button>
                        <button disabled={currPage >= pageAmnt} onClick={() => {
                            setCurrPage(prev => prev + 1)
                        }}>Next</button>
                        </div>

                        <div className="nummBasedpaginaion" style={{display : 'flex' , justifyContent : 'center' , gap : '20px'}}>
                            {pagesArr.map((item , index)=>{
                                return <>
                                    <p style={{cursor : 'pointer'}} onClick={() => setCurrPage(item)}>{item}</p>
                                </>
                            })}
                        </div>



                    </div>
                </> : <><h1>No New Orders</h1></>}
            </div>
        </>
    )
}

export default Get_order