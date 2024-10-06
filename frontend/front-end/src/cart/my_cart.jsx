import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../globalcontex/store_contex_GLB";
import axios from "axios";
import "./MyCart.css"; // Import the CSS file

function My_cart() {
    const { cart } = useContext(StoreContext);
    const [products, setProducts] = useState([]);
    const [showConformationForm, setShowConformationForm] = useState(false);
    const [userInfo, setUserInfo] = useState({
        address: "",
        email: "",
    });
    const [showNoItemsInCart, setShowNoItemsInCart] = useState(true);

    const check_cart = () => {
        let validation = 0;
        products.map((item) => {
            if (cart[item._id]) {
                validation++;
            }
        });
        if (validation > 0) {
            setShowNoItemsInCart(false);
        }
    };

    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const fetch_products = async () => {
        try {
            const resp = await axios.get(
                "http://localhost:5000/api/items/getall_item"
            );
            if (resp.data.success) {
                setProducts(resp.data.items);
            } else {
                console.log(resp.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetch_products();
    }, []);
    
    useEffect(() => {
        check_cart();
    }, [products, cart]);

    const confirmCheckOut = async () => {
        const itemArr = [];
        let absolutePrice = 0;
        const itemIds = [];
        products.forEach((item) => {
            if (cart[item._id]) {
                setShowNoItemsInCart(false);
                let list = item;
                list["quantity"] = cart[item._id];
                absolutePrice += Math.floor(item.price * cart[item._id]);
                itemArr.push(list);
                itemIds.push({
                    itemID: item._id,
                });
            }
        });

        const order_info = {
            item: itemArr,
            amount: absolutePrice,
            address: userInfo.address,
            email: userInfo.email,
        };

        try {
            const resp = await axios.post(
                "http://localhost:5000/api/order/place_order",
                order_info,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (resp.data.success) {
                const resp_2 = await axios.post(
                    "http://localhost:5000/api/items/update_total_item_ordered_amnt",
                    { itemIDs: itemIds }
                );
                const { session_url } = resp.data;
                if (resp_2.data.success) {
                    window.location.replace(session_url);
                } else {
                    window.alert("Error When Adding Total Bought Amount, Check Console");
                    console.log(resp_2.data.message);
                }
            } else {
                window.alert(resp.data.message);
                console.log(resp.data.message);
            }
        } catch (e) {
            window.alert("error in the try block");
            console.log("Error:", e);
        }
    };

    return (
        <div className="cart-container">
            {showConformationForm ? (
                <div className="confirmation-form">
                    <h1>Confirmation Form</h1>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={userInfo.address}
                        onChange={onChangehandler}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={userInfo.email}
                        onChange={onChangehandler}
                        required
                    />
                    <button className="btn" onClick={confirmCheckOut}>Confirm Order</button>
                </div>
            ) : (
                <div>
                    <>
                        {showNoItemsInCart ? (
                            <h1 className="no_itm_h1">No Items In Your Cart</h1>
                        ) : (
                            <>
                                {products.map((item) => {
                                    if (cart[item._id]) {
                                        const totalPrice = Math.floor(item.price * cart[item._id]);
                                        return (
                                            <div key={item._id} className="cart-item">
                                                <div className="cart-item-content">
                                                    <img src={`http://localhost:5000/item_images/${item.image}`} alt="" className="inrimg" />
                                                    <div className="item-details">
                                                        <h2>Name: {item.name}</h2>
                                                        <h2>Price: {item.price}$</h2>
                                                        <h2>Total Price: {totalPrice}$</h2>
                                                        <p>Bought: {cart[item._id]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                <h1 className="total-price">
                                    TOTAL : {products.reduce((acc, item) => {
                                        if (cart[item._id]) {
                                            acc += Math.round(item.price * cart[item._id]);
                                        }
                                        return acc;
                                    }, 0)} $
                                </h1>
                                <button className="btn" onClick={() => setShowConformationForm(true)}>Check Out</button>
                            </>
                        )}
                    </>
                </div>
            )}
        </div>
    );
}

export default My_cart;
