
import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProdRemDelHandling from "../product/product_add & rem handling"
import { useContext } from "react"
import { StoreContext } from "../globalcontex/store_contex_GLB"
function SearchResultShow() {

    const [searchParams] = useSearchParams(); // Using destructuring
    const [singleItem, setSingleItem] = useState([])
    const [itemID, setItemID] = useState(searchParams.get('itemID'))
    const { setCurrSearchedItem, currSearchedItem } = useContext(StoreContext)

    const fetchSingleItem = async () => {
        try {
            const resp = await axios.post('http://localhost:5000/api/items/fetchSingleItems', { itemID: currSearchedItem })
            if (resp.data.success) {
                setSingleItem(resp.data.singleItem)

            } else {
                window.alert('Error Fetching Item')
                console.log(resp.data.message)
                console.log(itemID)

            }
        } catch (e) {
            window.alert('Error In Catch Block')
            console.log(e)
        }

    }

    useEffect(() => {
        fetchSingleItem()
    }, [currSearchedItem])

    useEffect(() => { console.log(singleItem) }, [singleItem])

    return (
        <>  <div className="rstShwoBdy" style={{display : 'flex' , justifyContent: 'center'}}>
            <div className="prod_card" key={singleItem._id}>
                <img src={`http://localhost:5000/item_images/${singleItem.image}`} width={300} alt={singleItem.name} />
                <h2>{singleItem.name}</h2>
                <h3>{singleItem.category}</h3>
                <p>{singleItem.desc}</p>
                <hr />
                <p className="total_bought">Bought by {singleItem.total_bought} users</p>
                <p className="prod_price">${singleItem.price}</p>
                <ProdRemDelHandling itemID={singleItem._id} />
            </div>
        </div>

        </>
    )
}
export default SearchResultShow