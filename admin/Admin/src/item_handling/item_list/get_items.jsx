import axios from "axios"
import { useEffect, useState } from "react"


function Item_list() {

    const [item_list, setItem_list] = useState([])
    const [currPage, setCurrPage] = useState(1)
    
    const [pageArr, setPageArr] = useState([])

    const fetch_list = async () => {
        const resp = await axios.post(`http://localhost:5000/api/items/getall_item?currPage=${currPage}`)
        if (resp.data.success) {
            setItem_list(resp.data.items)
        }
        else {
            console.log(resp.data.message)
        }
    }

    const getPageAmnt = async () =>{
        try{
            const resp = await axios.get('http://localhost:5000/api/items/getItemsPageNumbers')
            if(resp.data.success){
                console.log(resp.data.pageAmnt)
                const pageNumArr = []
                for(let i = 1 ; i <= resp.data.pageAmnt  ; i++){
                    pageNumArr.push(i)
                }
                setPageArr(pageNumArr)
            }else{
                window.alert('failed fetching total pages amnt')
                console.log(resp.data.message)
            }
        }catch(e){
            window.alert('error in the client side try block')
            console.log(e)
        }
    }

    useEffect(() => {
        fetch_list()
    }, [currPage])

    useEffect(()=>{
        getPageAmnt()
    } , [])
    useEffect(()=>{console.log(pageArr)} , [pageArr])

    return (
        <>
            <div>
                {item_list.length === 0 ? <><h1>Not Items Added!</h1></> :

                    <>{item_list.map((item, index) => {
                        return <div key={index}>
                            <h2>{item.name}</h2>
                            <h2>{item.price}</h2>
                            <h2>{item.category}</h2>
                            <img src={`http://localhost:5000/item_images/${item.image}`} alt="" width={200} />
                            <button onClick={async () => {
                                const resp = await axios.post('http://localhost:5000/api/items/del_item', { itemID: item._id })
                                if (resp.data.success) {
                                    window.alert('Item Removed.')
                                }
                                else {
                                    console.log(resp.data.message)
                                }
                            }} >Remove</button>

                        </div>
                    })}</>}
                <div className="btnCntrls">
                    <button onClick={() => {
                        setCurrPage(prev => prev + 1)
                    }}>Next</button>
                    <button onClick={() => {
                        setCurrPage(prev => prev - 1)
                    }}>Prev</button>
                </div>
                <div className="pagenumbs" style={{display : 'flex' , justifyContent : "center" , gap : '10px'}}>
                    {pageArr.map((item , index)=>{
                        return<div key={index} className="pages">
                            <p onClick={()=>{
                                setCurrPage(item)
                            }} style={{cursor : "pointer"}}>{item}</p>
                        </div>
                    })}
                </div>
            </div>

            <br />
            <hr />
        </>
    )
}

export default Item_list