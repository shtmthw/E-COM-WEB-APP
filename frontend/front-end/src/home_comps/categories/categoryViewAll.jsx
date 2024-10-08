import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './CVA.css'
import ProdRemDelHandling from '../../product/product_add & rem handling';

function CategoryViewAll() {
    const [searchParams] = useSearchParams(); // Using destructuring
    const [currPage, setCurrPage] = useState(1);
    const [currLimit] = useState(2); // Set limit as a constant, no need to update
    const [itemData, setItemData] = useState([]);
    const [totalPages, setTotalPages] = useState(0); // Initialize to 0 for comparison

    const category = searchParams.get('category');

    const fetchCategories = async () => {
        try {
            const resp = await axios.post(`http://localhost:5000/api/category/lazyLoad_categories?page=${currPage}&limit=${currLimit}&category=${category}`);
            if (resp.data.success) {
                setItemData(resp.data.items);
                setTotalPages(resp.data.totalPages);
            } else {
                window.alert("Error Fetching Items Based On Category");
                console.log(resp.data.message);
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred while fetching categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [currPage, category]); // Fetch data whenever currPage or category changes

    return (
        <>
            <div className='mainCategoryItemBody'>
                {itemData.length > 0 ? (
                    <><div className='allProductCards' style={{ display: 'flex', justifyContent: 'center' }}>
                        {itemData.map((item) => (
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
                        ))}</div>
                        <br />
                        <div className="pagination_controls" style={{ display: 'flex', justifyContent: 'center' }}>

                            <button disabled={currPage === 1} onClick={() => {
                                if (currPage > 1) { // This condition is already correct
                                    setCurrPage(prev => prev - 1);
                                }
                            }}>Prev</button>

                            <button disabled={currPage >= totalPages} onClick={() => {
                                if (currPage < totalPages ) { // Prevent exceeding total pages
                                    setCurrPage(prev => prev + 1);
                                } else {
                                    window.alert('No More Pages');
                                }
                            }}>Next</button>
                        </div>
                    </>
                ) : (
                    <h2 style={{textAlign : 'center' , fontSize: '40px'}}>No items found in this category.</h2> // Handling case with no items
                )}
            </div>
        </>
    );
}

export default CategoryViewAll;
