import axios from "axios"
import { useEffect, useState } from "react"


function Get_delete_categories(){
    
    const [data  , setData] = useState([])
    
    const fetch_data = async() => {
        try{
            const resp = await axios.get('http://localhost:5000/api/category/get_categories')
            if(resp.data.success){
                setData(resp.data.categories)
                
            }
            else{
                console.log(resp.data.message)
            }
        }catch(e){
            console.log(e)
        }
    }

    const delete_category = async(categoryID) => {

        try{
            const resp = await axios.post('http://localhost:5000/api/category/remove_categories' , {categoryID : categoryID })
            if(resp.data.success){
                window.alert('Successfully Deleted Category')
            }else{
                window.alert('Error Deleting Category, Check Console')
                console.log(resp.data.message)
            }

        }catch(e){
            console.log(e)
        }

    }

    useEffect(() => {
        fetch_data()
    } ,[])

    
    return (
        
        <>
            <div className="main_cat_delete">
                {data.length > 0 ? <>
                    <div className="show_cats">
                        {data.map((item , index)=>{
                            return <>
                                <div inner_cat_div key={index}>
                                    <h1>{item.name}</h1>
                                    <h1>{item.weight}</h1>
                                    <button onClick={() => {
                                        delete_category(item._id)
                                    }}>Delete</button>
                                </div>
                                <br />
                                <hr />
                            </>
                        })}
                    </div>
                </> : <><h1>No Categories Available</h1></>}
            </div>
        </>

    )
}

export default Get_delete_categories