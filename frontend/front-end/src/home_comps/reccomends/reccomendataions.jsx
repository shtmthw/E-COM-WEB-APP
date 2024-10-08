import axios from "axios";
import { useEffect, useState } from "react";
import ProdRemDelHandling from "../../product/product_add & rem handling";
import "./RecommendedProducts.css"; // Importing the CSS file

function RecommendedProducts() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMostBoughtProducts = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/api/items/get_mostBoughtProducts");
            console.log(resp.data); // Log the whole response for debugging

            if (resp.data.success) {
                setFilteredProducts(resp.data.topThreeItemArr || []);
            } else {
                console.error(resp.data.message);
                window.alert('Failed fetching most bought products');
                setFilteredProducts([]);
            }
        } catch (e) {
            console.error('Error fetching most bought products:', e);
            window.alert('An error occurred while fetching the products');
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMostBoughtProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="products-container"> {/* Updated container class */}
            <div className="product-names" style={{cursor : 'pointer',flexWrap : "wrap",display : "flex" , justifyContent : "center"}}> {/* New wrapper for names */}
                {filteredProducts.map((item) => (
                    <div className="prod_card" key={item._id}>
                        <h1>{item.name}</h1>
                        <h3>{item.category}</h3>
                        {/* <hr /> */}
                        <p className="total_bought">Bought by {item.total_bought} users</p>
                        <p className="prod_price">${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedProducts;
