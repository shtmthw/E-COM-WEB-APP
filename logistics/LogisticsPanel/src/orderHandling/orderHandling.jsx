import axios from 'axios'
import { useEffect, useState } from 'react'
import './orderHandling.css'
function OrderHandling() {

    const [rawData, setRawdata] = useState([])
    const [formattedData, setFormattedData] = useState([])
    const [currPage, setCurrPage] = useState(0)
    const [totalPage, setTotalPage] = useState([])
    const [OrderStates, setOrderState] = useState([])

    const fetchRawData = async () => {
        try {
            console.log(typeof (OrderStates))
            const resp = await axios.get('http://localhost:5000/api/order/filter_confirmed_orders')
            if (resp.data.success) {
                setRawdata(resp.data.orders)
            } else {
                window.alert('Failed Fetching Raw data')
                console.log(resp.data.message)
            }
        } catch (e) {
            window.alert('Error occurred in the catch block')
            console.log(e)
        }
    }

    const formatFetchedData = async () => {
        try {
            const allPageData = {}
            const orderPerPage = 1
            const totalPages = Math.ceil(rawData.length / orderPerPage)
            let index = 0
            const totalPageArr = []
            for (let i = 0; i < totalPages; i++) {
                totalPageArr.push(i)
                const singlePageData = []
                for (let j = 0; j < orderPerPage; j++) {
                    if (index >= rawData.length) break
                    singlePageData.push({
                        ID: rawData[index]._id,
                        userID: rawData[index].userID,
                        items: rawData[index].items,
                        amount: rawData[index].amount,
                        email: rawData[index].email,
                        address: rawData[index].address,
                        state: rawData[index].state
                    })
                    index++
                }
                allPageData[i] = singlePageData
            }
            setFormattedData(allPageData)
            setTotalPage(totalPageArr)

        } catch (e) {
            window.alert('Error occurred in the catch block')
            console.log(e)
        }
    }

    const handleOrderStateUpdate = (ID, state) => {
        try {
            const existingOrder = OrderStates.find(item => item.ID === ID);
            if (existingOrder) {
                setOrderState(prev => {
                    const modifiedArr = prev.map((item) => {
                        if (item.ID === ID) {
                            return { ...item, state: state }
                        } else {
                            return item
                        }
                    })
                    return modifiedArr
                })
            } else {
                setOrderState(prev => [...prev, { ID, state }])
            }
        } catch (e) {
            window.alert('Error Occurred While Trying to handle State Change')
            console.log(e)
        }
    }

    const submitUpdatedStates = async () => {
        try {
            const resp = await axios.post('http://localhost:5000/api/order/update_order_status', OrderStates)
            if (resp.data.success) {
                window.location.reload();
                setOrderState([])
            } else {
                window.alert('Failed Saving Updated States.')
                console.log(resp.data.message)
            }
        } catch (e) {
            window.alert('Error Occurred While Trying To Submit Updated States In The Server.')
            console.log(e)
        }
    }

    useEffect(() => {
        fetchRawData()
    }, [])

    useEffect(() => {
        if (rawData.length > 0) {
            formatFetchedData()
            console.log(rawData)
        }
    }, [rawData])

    useEffect(() => {
        console.log(formattedData)
    }, [formattedData])

    return (
        <>
            <div className="body">
                {Object.keys(formattedData).length > 0 ? (
                    <>
                        <div className="inrBody">
                            {formattedData[currPage].map((item, index) => {
                                return (
                                    <div key={index} className="dataBody">
                                        <h1>Email: {item.email}</h1>
                                        <div className="orderInfo">
                                            <p><span>Items:</span> {item.items.map((product) => product.name).join(', ')}</p>
                                            <p><span>Total Amount:</span> ${item.amount}</p>
                                            <p><span>Shipping Address:</span> {item.address}</p>
                                        </div>

                                        <h3>Status</h3>
                                        <select onChange={(event) => handleOrderStateUpdate(item.ID, event.target.value)} name="" id="">
                                            <option value={item.state}>Current: {item.state}</option>
                                            <option value="Received By The Logistics Team.">Received By The Logistics Team.</option>
                                            <option value="Being Shipped By The Logistics Teams.">Being Shipped By The Logistics Teams.</option>
                                            <option value="Shipped By The Logistics Teams.">Shipped By The Logistics Teams.</option>
                                            <option value="Being Delivered By The Logistics Teams.">Being Delivered By The Logistics Teams.</option>
                                            <option value="Succesfully Delivered By The Logistics Teams.">Succesfully Delivered By The Logistics Teams.</option>
                                        
                                        </select>
                                    </div>
                                )
                            })}

                            <div className="btnCntrls">
                                {/* Prev Button */}
                                <button
                                    disabled={currPage <= 0}
                                    onClick={() => setCurrPage(prev => prev - 1)}
                                >
                                    Prev
                                </button>

                                {/* Save Button */}
                                <button onClick={() => submitUpdatedStates()}>
                                    {OrderStates.length > 0 ? 'Save' : 'Unsaved'}
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={currPage >= totalPage.length - 1}
                                    onClick={() => setCurrPage(prev => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>


                            <div className="numberPagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                {totalPage.map((item, index) => (
                                    <p
                                        key={index}
                                        style={{ cursor: 'pointer' }}
                                        className={currPage === item ? 'active' : ''}
                                        onClick={() => setCurrPage(item)}
                                    >
                                        {item + 1}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Loading...</h1>
                    </>
                )}
            </div>
        </>
    )
}

export default OrderHandling
