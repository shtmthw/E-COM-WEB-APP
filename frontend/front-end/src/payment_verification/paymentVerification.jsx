import axios from 'axios'
import { useEffect } from 'react'
import { Await, useNavigate, useSearchParams } from 'react-router-dom'

function PaymentVerification(){
    
    const [srchprama, setSrchparam] = useSearchParams()
    const success = srchprama.get('success')
    const orderId = srchprama.get('orderId')
    const navigate = useNavigate()

    const verify_order_payment=async()=>{
        try{
            if(success === 'true'){
                const resp = await axios.post('http://localhost:5000/api/order/order_payment_verification' , {orderID : orderId})
                if(resp.data.success){
                    navigate('/')
                }else{
                    window.alert('Order Payment Unsucessful')
                    navigate('/my_cart')
                }
            }else{
                window.alert('Payent Cancled')
                navigate('/')
            }

        }catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        verify_order_payment()
    },[])

    return(
        <>
            <h1 style={{textAlign : 'center'}}>Processing......</h1>
        </>
    )
}
export default PaymentVerification