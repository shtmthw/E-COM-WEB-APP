import axios from "axios";
import { useEffect, useState } from "react";
import './UserOrderDisplay.css'; // Import the CSS file

function UserorderDisplay() {
    const [orderData, setOrderData] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [forMattedOrderdata, setForMattedOrderdata] = useState([])
    const [currPage, setCurrPage] = useState(0)
    const fetch_orders = async () => {
        try {
            const resp = await axios.post("http://localhost:5000/api/order/my_orders", {},
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (resp.data.success) {
                setOrderData(resp.data.orders);
            } else {
                // window.alert(resp.data.message);
                console.log(resp.data.message);
            }
        } catch (e) {
            // window.alert(e.response.data.message);
            console.log(e);
        }
    };


    const formatOrderData = async () => {
        let index = 0
        let allPagesDataObj = {}
        for (let i = 0; i < totalPages; i++) {
            const singlePageData = []
            for (let j = 0; j < itemsPerPage; j++) {
                if (index >= orderData.length) {
                    break
                }
                singlePageData.push({
                    _id: orderData[index]._id,
                    userID: orderData[index].userID,
                    items: orderData[index].items,
                    amount: orderData[index].amount,
                    address: orderData[index].address,
                    state: orderData[index].state,
                    date: orderData[index].date,
                    payment: orderData[index].payment,
                    order_conformmation: orderData[index].order_conformmation
                })
                index++
            }
            allPagesDataObj[i] = singlePageData
        }
        setForMattedOrderdata(allPagesDataObj)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch_orders();
        } else {
            window.alert('Not Logged In.')
        }
    }, []);

    useEffect(() => {
        if (orderData.length !== 0) {
            const calulationOfTotalPages = Math.ceil(orderData.length / itemsPerPage)
            setTotalPages(calulationOfTotalPages)
        }
    }, [orderData])

    useEffect(() => {
        if (totalPages > 0) {
            formatOrderData()
        }
    }, [totalPages])

    useEffect(() => {
        if (forMattedOrderdata.length !== 0) {
            console.log(forMattedOrderdata)
        }
    }, [forMattedOrderdata])

    return (

        <>
            {forMattedOrderdata.length !== 0 ?
                <>
                    <div className="order-tiles">
                        {forMattedOrderdata[currPage].map((item, index) => {
                            return <>
                                <div className="order-tile" key={item._id}>
                                    <h2>Order: {index + 1}</h2>
                                    <h3 style={{ color: 'black' }}>Current State: {item.state}</h3>
                                    <h4 style={{ color: 'blue' }}>Items Ordered:</h4>
                                    <ul>
                                        {item.items.map((orderItms, orderItmIndex) => (
                                            <li style={{ color: 'black' }} key={orderItmIndex}>
                                                {orderItms.name} (Quantity: {orderItms.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                    <h3 style={{ color: 'darkgreen' }}>Total Amount: ${item.amount}</h3> {/* Assuming amount is in cents */}
                                    <h3>Payment Status: {item.payment ? "Paid" : "Unpaid"}</h3>

                                </div>                        </>
                        })}


                    </div>
                    <div className="pagecntrl-btn" style={{ display: 'flex', justifyContent: "center" }}>
                        <button onClick={() => {
                            setCurrPage(prev => prev - 1)
                        }} disabled={currPage === 0} >Prev</button>
                        <button onClick={() => {
                            setCurrPage(prev => prev + 1)
                        }} disabled={currPage >= totalPages - 1}>Next</button>
                    </div>
                </>
                : <><h1 style={{textAlign : 'center' , margin : '100px'}}>No Orders Found!</h1></>}
        </>

    );
}

export default UserorderDisplay;
