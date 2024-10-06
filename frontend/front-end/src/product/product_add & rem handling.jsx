import { useContext } from "react";
import { StoreContext } from "../globalcontex/store_contex_GLB";

function ProdRemDelHandling({ itemID }) {
    const { cart, add_item_inCart, rem_itm_inCart } = useContext(StoreContext);

    const handleAdd = async () => {
        try {
            await add_item_inCart(itemID);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleRemove = async () => {
        try {
            await rem_itm_inCart(itemID);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    return (
        <div className="button_body">
            {cart[itemID] > 0 ? (
                <>
                <div>
                    <p style={{color :"green"}}>{cart[itemID]}</p>
                </div>
                <div className="add_or_remove">
                    <button onClick={()=>{handleAdd()}} aria-label="Increase quantity">+</button>
                    <button onClick={()=>{handleRemove()}} aria-label="Decrease quantity">-</button>
                </div>
            </>) : (
                <div className="add_new">
                    <button onClick={()=>{handleAdd()}} aria-label="Add item to cart">Add In Cart</button>
                </div>
            )}
        </div>
    );
}

export default ProdRemDelHandling;
