import { useEffect, useState } from "react";
import axios from 'axios';
import './ProductView.css';
import ProdRemDelHandling from "./product_add & rem handling";

function Product_view() {
    const [data, setData] = useState([]);
    const [formattedData, setFormattedData] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);

    const format_data = () => {
        let item_index = 0;
        const totalPageData = {};
        for (let i = 0; i < totalPage; i++) {
            const perPageData = [];
            for (let j = 0; j < productsPerPage; j++) {
                if (item_index >= data.length) {
                    break;
                }
                perPageData.push({
                    _id: data[item_index]._id,
                    name: data[item_index].name,
                    category: data[item_index].category,
                    price: data[item_index].price,
                    image: data[item_index].image,
                    desc: data[item_index].desc,
                    total_bought: data[item_index].total_bought
                });
                item_index++;
            }
            totalPageData[i] = perPageData;
        }
        setFormattedData(totalPageData);
    };

    const fetch_products = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/items/getall_item');
            if (resp.data.success) {
                setData(resp.data.items);
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
        if (data.length > 0) {
            const calculatedPages = Math.ceil(data.length / productsPerPage);
            setTotalPage(calculatedPages);
        }
    }, [data, productsPerPage]);

    useEffect(() => {
        if (totalPage !== 0) {
            format_data();
        }
    }, [totalPage]);

    const handleNext = () => {
        if (currentPage < totalPage - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <>
            {formattedData[currentPage] ? (
                <div className="prod_cont">
                    {formattedData[currentPage].map((item) => (
                        <div className="prod_card" key={item._id}>
                            <img src={`http://localhost:5000/item_images/${item.image}`} width={300} alt={item.name} />
                            <h2>{item.name}</h2>
                            <h3>{item.category}</h3>
                            <p>{item.desc}</p>
                            <hr />
                            <p className="total_bought">Bought by {item.total_bought} users</p>
                            <p className="prod_price">${item.price}</p>
                            <ProdRemDelHandling itemID={item._id} />
                        </div>
                    ))}
                    <div className="btn-cnt">
                        <button className="prod_btn_for_pagination" onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                        <button onClick={handleNext} className="prod_btn_for_pagination" disabled={currentPage === totalPage - 1}>Next</button>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
}

export default Product_view;
